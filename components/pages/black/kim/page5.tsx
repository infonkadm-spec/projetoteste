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
    let checkCount = 0;

    // Função para verificar o tempo do vídeo
    const checkVideoTime = () => {
      checkCount++;
      let maxStoredTime = 0;

      // Verifica todas as chaves possíveis do localStorage (incluindo variações do teste A/B)
      const keysToCheck = [
        // Chaves padrão
        videoId + '-resume',
        videoId,
        'vid-' + videoId,
        'vid-' + videoId + '-current',
        // Chaves específicas do teste A/B
        'ab-test-' + videoId,
        'ab-test-' + videoId + '-time',
        'ab-test-' + videoId + '-current',
        'ab-' + videoId,
        'ab-' + videoId + '-time',
        'ab-' + videoId + '-current',
        'ab-' + videoId + '-resume',
        // Chaves do player
        'player-' + videoId,
        'player-' + videoId + '-time',
        // Chaves VTurb
        'vturb-' + videoId,
        'vturb-' + videoId + '-time',
        'vturb-' + videoId + '-current',
        'vturb-' + videoId + '-resume',
        // Chaves smartplayer
        'smartplayer-' + videoId,
        'smartplayer-' + videoId + '-time',
        // Chaves com ID completo incluindo prefixo
        'ab-69324e13afcc411b3a71e97e',
        'ab-69324e13afcc411b3a71e97e-time',
        'ab-69324e13afcc411b3a71e97e-current',
      ];

      // Verifica todas as chaves do localStorage
      keysToCheck.forEach(key => {
        try {
          const value = Number(localStorage.getItem(key) || 0);
          if (value > maxStoredTime) {
            maxStoredTime = value;
          }
        } catch {
          // Ignora erros
        }
      });

      // Verifica também todas as chaves do localStorage que contenham o videoId
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && (key.includes(videoId) || key.includes('69324e13afcc411b3a71e97e'))) {
            const value = Number(localStorage.getItem(key) || 0);
            if (value > maxStoredTime) {
              maxStoredTime = value;
            }
          }
        }
      } catch {
        // Ignora erros
      }

      // Tenta obter o tempo diretamente do elemento do player
      try {
        const playerElement = document.getElementById('ab-' + videoId);
        if (playerElement) {
          interface PlayerElement extends HTMLElement {
            currentTime?: number;
            videoCurrentTime?: number;
            getCurrentTime?: () => number;
            _currentTime?: number;
            video?: {
              currentTime?: number;
            };
          }
          const player = playerElement as PlayerElement;
          
          // Tenta diferentes formas de acessar o tempo
          if (player.currentTime !== undefined) {
            maxStoredTime = Math.max(maxStoredTime, Number(player.currentTime) || 0);
          }
          if (player.videoCurrentTime !== undefined) {
            maxStoredTime = Math.max(maxStoredTime, Number(player.videoCurrentTime) || 0);
          }
          if (player._currentTime !== undefined) {
            maxStoredTime = Math.max(maxStoredTime, Number(player._currentTime) || 0);
          }
          if (player.video?.currentTime !== undefined) {
            maxStoredTime = Math.max(maxStoredTime, Number(player.video.currentTime) || 0);
          }
          if (player.getCurrentTime && typeof player.getCurrentTime === 'function') {
            try {
              const time = Number(player.getCurrentTime()) || 0;
              maxStoredTime = Math.max(maxStoredTime, time);
            } catch {
              // Ignora erros
            }
          }

          // Tenta acessar através do shadow DOM se existir
          if (player.shadowRoot) {
            const video = player.shadowRoot.querySelector('video');
            if (video && video.currentTime) {
              maxStoredTime = Math.max(maxStoredTime, Number(video.currentTime) || 0);
            }
          }
        }
      } catch {
        // Ignora erros
      }

      // Atualiza o tempo atual
      currentVideoTime = maxStoredTime;

      // Log para debug (a cada 10 verificações para não poluir o console)
      if (checkCount % 10 === 0 && maxStoredTime > 0 && maxStoredTime < pitchTime) {
        console.log(`[Video Sync] Tempo atual: ${Math.floor(maxStoredTime)}s / ${pitchTime}s (${Math.floor((maxStoredTime / pitchTime) * 100)}%)`);
      }

      // Verifica se o tempo atingiu 10:30 (630 segundos)
      if (maxStoredTime >= pitchTime) {
        console.log(`[Video Sync] ✅ Botão liberado! Tempo: ${Math.floor(maxStoredTime)}s (${Math.floor(maxStoredTime / 60)}:${String(Math.floor(maxStoredTime % 60)).padStart(2, '0')})`);
        setVisible(true);
        return true;
      }
      return false;
    };

    // Escuta eventos do player quando disponível
    const setupPlayerListeners = () => {
      const playerElement = document.getElementById('ab-' + videoId);
      if (playerElement) {
        console.log('[Video Sync] Player encontrado, configurando listeners...');
        
        // Escuta eventos de tempo do vídeo
        playerElement.addEventListener('timeupdate', () => {
          checkVideoTime();
        });
        
        playerElement.addEventListener('progress', () => {
          checkVideoTime();
        });

        playerElement.addEventListener('loadedmetadata', () => {
          checkVideoTime();
        });

        // Escuta eventos customizados do VTurb
        const customEventListener = ((e: CustomEvent) => {
          if (e.detail) {
            const detail = e.detail as { videoId?: string; currentTime?: number; time?: number };
            if ((detail.videoId === videoId || detail.videoId === 'ab-' + videoId) && (detail.currentTime || detail.time)) {
              currentVideoTime = Number(detail.currentTime || detail.time) || 0;
              if (currentVideoTime >= pitchTime) {
                setVisible(true);
              } else {
                checkVideoTime();
              }
            }
          }
        }) as EventListener;

        window.addEventListener('vturb-video-progress', customEventListener);
        window.addEventListener('video-progress', customEventListener);
        window.addEventListener('player-progress', customEventListener);
      } else {
        console.log('[Video Sync] Player não encontrado ainda, tentando novamente...');
      }
    };

    // Verifica o tempo do vídeo periodicamente (a cada 300ms para melhor responsividade)
    const intervalId = setInterval(() => {
      if (checkVideoTime()) {
        clearInterval(intervalId);
      }
    }, 300);

    // Listener para mudanças no localStorage
    const storageListener = (e: StorageEvent) => {
      if (e.key && (e.key.includes(videoId) || e.key.includes('ab-') || e.key.includes('vturb-') || e.key.includes('69324e13afcc411b3a71e97e'))) {
        checkVideoTime();
      }
    };
    window.addEventListener('storage', storageListener);

    // Tenta configurar listeners várias vezes para garantir que o player esteja carregado
    const setupTimeout1 = setTimeout(() => {
      setupPlayerListeners();
    }, 1000);
    
    const setupTimeout2 = setTimeout(() => {
      setupPlayerListeners();
    }, 3000);
    
    const setupTimeout3 = setTimeout(() => {
      setupPlayerListeners();
    }, 5000);

    // Fallback principal: garante que o botão apareça exatamente em 10:30 (630 segundos)
    const timeoutId = setTimeout(() => {
      console.log('[Video Sync] ⏰ Fallback ativado - botão liberado após 10:30');
      setVisible(true);
      clearInterval(intervalId);
    }, pitchTime * 1000);

    // Fallback de segurança: libera o botão após 10:35 (635s) caso nenhuma detecção funcione
    const safetyTimeout = setTimeout(() => {
      console.log('[Video Sync] 🛡️ Safety fallback ativado - botão liberado após 10:35');
      setVisible(true);
    }, 635 * 1000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      clearTimeout(setupTimeout1);
      clearTimeout(setupTimeout2);
      clearTimeout(setupTimeout3);
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