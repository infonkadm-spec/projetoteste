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

    let currentVideoTime = 0;

    // Função para verificar o tempo do vídeo
    const checkVideoTime = () => {
      // Verifica todas as chaves possíveis do localStorage
      const keysToCheck = [
        videoId + '-resume',
        videoId,
        'vid-' + videoId,
        'vid-' + videoId + '-current',
        'ab-test-' + videoId,
        'ab-' + videoId,
        'player-' + videoId,
        'vturb-' + videoId,
        'vturb-' + videoId + '-time',
        'vturb-' + videoId + '-current',
        'smartplayer-' + videoId,
        'smartplayer-' + videoId + '-time',
      ];

      let maxStoredTime = 0;
      
      // Verifica todas as chaves do localStorage
      keysToCheck.forEach(key => {
        const value = Number(localStorage.getItem(key) || 0);
        if (value > maxStoredTime) {
          maxStoredTime = value;
        }
      });

      // Tenta obter o tempo diretamente do elemento do player
      try {
        const playerElement = document.getElementById('ab-' + videoId);
        if (playerElement) {
          // Tenta acessar propriedades do player
          interface PlayerElement extends HTMLElement {
            currentTime?: number;
            videoCurrentTime?: number;
            getCurrentTime?: () => number;
          }
          const player = playerElement as PlayerElement;
          if (player.currentTime !== undefined) {
            maxStoredTime = Math.max(maxStoredTime, Number(player.currentTime) || 0);
          }
          if (player.videoCurrentTime !== undefined) {
            maxStoredTime = Math.max(maxStoredTime, Number(player.videoCurrentTime) || 0);
          }
          if (player.getCurrentTime && typeof player.getCurrentTime === 'function') {
            try {
              const time = Number(player.getCurrentTime()) || 0;
              maxStoredTime = Math.max(maxStoredTime, time);
            } catch {
              // Ignora erros ao chamar getCurrentTime
            }
          }
        }
      } catch {
        // Ignora erros
      }

      // Atualiza o tempo atual
      currentVideoTime = maxStoredTime;

      // Log para debug
      if (maxStoredTime > 0 && maxStoredTime < pitchTime) {
        console.log(`[Video Sync] Tempo atual: ${Math.floor(maxStoredTime)}s / ${pitchTime}s`);
      }

      // Verifica se o tempo atingiu o pitchTime
      if (maxStoredTime >= pitchTime) {
        console.log(`[Video Sync] Botão liberado! Tempo: ${Math.floor(maxStoredTime)}s`);
        setVisible(true);
        return true;
      }
      return false;
    };

    // Escuta eventos do player quando disponível
    const setupPlayerListeners = () => {
      const playerElement = document.getElementById('ab-' + videoId);
      if (playerElement) {
        // Escuta eventos de tempo do vídeo
        playerElement.addEventListener('timeupdate', () => {
          checkVideoTime();
        });
        
        playerElement.addEventListener('progress', () => {
          checkVideoTime();
        });

        // Escuta eventos customizados do VTurb
        window.addEventListener('vturb-video-progress', ((e: CustomEvent) => {
          if (e.detail && e.detail.videoId === videoId && e.detail.currentTime) {
            currentVideoTime = Number(e.detail.currentTime) || 0;
            if (currentVideoTime >= pitchTime) {
              setVisible(true);
            }
          }
        }) as EventListener);
      }
    };

    // Verifica o tempo do vídeo periodicamente
    const intervalId = setInterval(() => {
      if (checkVideoTime()) {
        clearInterval(intervalId);
      }
    }, 500);

    // Listener para mudanças no localStorage (detecta quando o player salva o progresso em outras abas)
    const storageListener = (e: StorageEvent) => {
      if (e.key && (e.key.includes(videoId) || e.key.includes('ab-') || e.key.includes('vturb-'))) {
        checkVideoTime();
      }
    };
    window.addEventListener('storage', storageListener);

    // Tenta configurar listeners após um delay para garantir que o player esteja carregado
    const setupTimeout = setTimeout(() => {
      setupPlayerListeners();
    }, 2000);

    // Fallback: garante que o botão apareça após o tempo necessário (com margem de segurança)
    const timeoutId = setTimeout(() => {
      console.log('[Video Sync] Fallback ativado - botão liberado por timeout');
      setVisible(true);
      clearInterval(intervalId);
    }, (pitchTime + 10) * 1000);

    // Fallback adicional: libera o botão após 11 minutos (660s) caso nenhuma detecção funcione
    const safetyTimeout = setTimeout(() => {
      console.log('[Video Sync] Safety fallback ativado - botão liberado');
      setVisible(true);
    }, 660 * 1000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      clearTimeout(setupTimeout);
      clearTimeout(safetyTimeout);
      window.removeEventListener('storage', storageListener);
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