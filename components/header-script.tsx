import Script from "next/script";

const idList: Record<string, string> = {
  kim: "6920f79745ab396fb596faa4",
  elon: "6920f79745ab396fb596faa4",
  shakira: "6920f79745ab396fb596faa4",
};

export default function HeaderScript({ content }: { content: string }) {

  const pixelId = idList[content];

  if (!pixelId) return null;

  return (
    <>
      <Script
        id="utmify-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.pixelId=${JSON.stringify(pixelId)};`,
        }}
      />
      <Script
        id="utmify-pixel"
        src="https://cdn.utmify.com.br/scripts/pixel/pixel.js"
        strategy="afterInteractive"
      />
      <Script
        id="utmify-utms"
        src="https://cdn.utmify.com.br/scripts/utms/latest.js"
        data-utmify-prevent-subids
        strategy="afterInteractive"
      />
    </>
  );
  
};