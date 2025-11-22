import Script from "next/script";

export default function HeaderScript({ content }: { content: string }) {

  return (
    <>
      <Script
        id="utmify-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.pixelId = "6920f79745ab396fb596faa4";`,
        }}
      />
      <Script
        id="utmify-pixel"
        src="https://cdn.utmify.com.br/scripts/pixel/pixel.js"
        strategy="afterInteractive"
        async
        defer
      />
    </>
  );
  
};