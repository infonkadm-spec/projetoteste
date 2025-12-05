import Button from "@/components/button";
import Comments from "@/components/comments";
import PlacesAlert from '@/components/places-alert';
import VSLBlackKim from "@/components/videos/vsl-black-kim";
import { useLayer } from '@/context/layer-provider';
import { useEffect, useState } from 'react';
import { CheckCheck, Loader2 } from 'lucide-react';

export default function Page({
  active,
  handleClick,
}:{
  active: boolean,
  handleClick: () => void,
}) {

  // COMPONENT STATES
  const [visible, setVisible] = useState<boolean>(false);

  // IMPORT CONTEXT DATA
  const userLayerData = useLayer();

  // USER LAYER DATA
  const userHost = userLayerData.host;
  const userFrontLink = userLayerData.frontLink;

  // SET CONTENT DATA
  const VSL = VSLBlackKim;
  // Deve bater com o ID do player VTurb (sem o prefixo "ab-")
  const videoId = "69324e13afcc411b3a71e97e";
  const backLink = `https://${userHost}/promo`;
  // 10:30 = 630 segundos
  const pitchTime = 630;
  const ctaLink = userFrontLink;

  // VIDEO VERIFY - Sincronizado com vturb-smartplayer em 10:30 (630 segundos)
  useEffect(() => {
    if (visible) return;

    let videoElement: HTMLVideoElement | null = null;
    let timeUpdateHandler: (() => void) | null = null;

    // Função para encontrar e monitorar o elemento de vídeo
    const findAndMonitorVideo = () => {
      // Tenta encontrar o elemento de vídeo de várias formas
      const playerElement = document.getElementById('ab-' + videoId);
      
      if (playerElement) {
        // Tenta encontrar o vídeo dentro do player (pode estar em shadow DOM)
        let video: HTMLVideoElement | null = null;
        
        // Tenta no shadowRoot
        if (playerElement.shadowRoot) {
          video = playerElement.shadowRoot.querySelector('video');
        }
        
        // Se não encontrou, tenta no próprio elemento ou filhos
        if (!video) {
          video = playerElement.querySelector('video');
        }
        
        // Se ainda não encontrou, tenta buscar em todo o documento (último recurso)
        if (!video) {
          const allVideos = document.querySelectorAll('video');
          // Pega o primeiro vídeo que estiver próximo ao player
          allVideos.forEach(v => {
            if (playerElement.contains(v) || v.closest('vturb-smartplayer') === playerElement) {
              video = v;
            }
          });
        }

        if (video && !videoElement) {
          videoElement = video;
          console.log('[Video Sync] ✅ Vídeo encontrado! Iniciando monitoramento...');
          
          // Remove handler anterior se existir
          if (timeUpdateHandler) {
            video.removeEventListener('timeupdate', timeUpdateHandler);
          }
          
          // Cria novo handler
          timeUpdateHandler = () => {
            const currentTime = videoElement?.currentTime || 0;
            
            if (currentTime >= pitchTime) {
              console.log(`[Video Sync] ✅ Botão liberado! Tempo: ${Math.floor(currentTime)}s`);
              setVisible(true);
              if (videoElement && timeUpdateHandler) {
                videoElement.removeEventListener('timeupdate', timeUpdateHandler);
              }
            } else if (Math.floor(currentTime) % 30 === 0 && currentTime > 0) {
              // Log a cada 30 segundos
              console.log(`[Video Sync] Tempo: ${Math.floor(currentTime)}s / ${pitchTime}s`);
            }
          };
          
          video.addEventListener('timeupdate', timeUpdateHandler);
        }
      }
    };

    // Verifica localStorage como fallback
    const checkLocalStorage = () => {
      // Chaves mais prováveis para teste A/B
      const keys = [
        videoId + '-resume',
        videoId,
        'ab-' + videoId,
        'ab-' + videoId + '-resume',
        'ab-test-' + videoId,
        'ab-test-' + videoId + '-resume',
      ];

      let maxTime = 0;
      keys.forEach(key => {
        const value = Number(localStorage.getItem(key) || 0);
        if (value > maxTime) {
          maxTime = value;
        }
      });

      // Verifica todas as chaves que contenham o videoId
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.includes(videoId)) {
            const value = Number(localStorage.getItem(key) || 0);
            if (value > maxTime) {
              maxTime = value;
            }
          }
        }
      } catch {
        // Ignora erros
      }

      if (maxTime >= pitchTime) {
        console.log(`[Video Sync] ✅ Botão liberado via localStorage! Tempo: ${Math.floor(maxTime)}s`);
        setVisible(true);
        return true;
      }
      return false;
    };

    // Tenta encontrar o vídeo periodicamente
    const findVideoInterval = setInterval(() => {
      if (!videoElement) {
        findAndMonitorVideo();
      }
    }, 1000);

    // Verifica localStorage periodicamente como backup
    const localStorageInterval = setInterval(() => {
      if (checkLocalStorage()) {
        clearInterval(localStorageInterval);
      }
    }, 2000);

    // MutationObserver para detectar quando o player é adicionado ao DOM
    const observer = new MutationObserver(() => {
      if (!videoElement) {
        findAndMonitorVideo();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Tenta encontrar imediatamente
    findAndMonitorVideo();

    // Fallback principal: garante que o botão apareça em 10:30 (630 segundos)
    const timeoutId = setTimeout(() => {
      console.log('[Video Sync] ⏰ Fallback ativado - botão liberado após 10:30');
      setVisible(true);
      clearInterval(findVideoInterval);
      clearInterval(localStorageInterval);
      observer.disconnect();
    }, pitchTime * 1000);

    return () => {
      clearInterval(findVideoInterval);
      clearInterval(localStorageInterval);
      clearTimeout(timeoutId);
      observer.disconnect();
      if (videoElement && timeUpdateHandler) {
        videoElement.removeEventListener('timeupdate', timeUpdateHandler);
      }
    };
  }, [videoId, pitchTime, visible]);

  // BACK REDIRECT
  useEffect(() => {
    function setBackRedirect(url: string) {
      let urlBackRedirect = url;
      urlBackRedirect =
        urlBackRedirect.trim() +
        (urlBackRedirect.indexOf('?') > 0 ? '&' : '?') +
        document.location.search.replace('?', '').toString();
      history.pushState({}, '', location.href);
      history.pushState({}, '', location.href);
      history.pushState({}, '', location.href);
      window.addEventListener('popstate', () => {
        console.log('onpopstate', urlBackRedirect);
        setTimeout(() => {
          location.href = urlBackRedirect;
        }, 1);
      });
    };

    setBackRedirect(backLink);
  }, [backLink]);

  return (
    <>
      <div className="flex flex-col text-center text-sm rounded-3xl gap-5 bg-gradient-to-t appear border-t px-4 py-6 from-gray-50 to-gray-200/50 border-gray-300">
        <span className="text-base sm:text-2xl font-semibold text-balance tracking-tight">
          🚨 ATTENTION! Watch the video to the end to understand how to withdraw your available balance. ⬇️
        </span>
        <PlacesAlert visible={visible} />
      </div>
      <div className="flex flex-col items-center gap-8 relative -mt-4">
        <VSL />
        {visible && (
          <a href={ctaLink}>
            <Button
              onClick={handleClick}
              disabled={active}
              className="pulse border-b-4 !px-6 !py-3 !bg-green-500 !border-green-600 hover:!bg-green-600"
            >
              {active ? (
                <Loader2 className="size-5 animate-spin" />
              ):(
                <CheckCheck className="size-5" />
              )}
              <span>I WANT TO PAY THE FEE!</span>
            </Button>
          </a>
        )}
      </div>
      {!visible && (
        <div className="text-sm text-center p-2">
          🔊 Check if your sound is turned on
        </div>
      )}
      <Comments />
    </>
  );
  
};