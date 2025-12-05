import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    _plt?: number;
  }
}

export default function VSLBlackKim() {
  useEffect(() => {
    // Performance script
    if (!window._plt) {
      const perfScript = document.createElement("script");
      perfScript.textContent = `!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);`;
      document.head.appendChild(perfScript);
    }

    // Preload links
    const preloadLinks = [
      { href: "https://scripts.converteai.net/7811ed69-550c-4b89-9a28-8ab5dbe8db56/ab-test/69323831c5a3364c7812b1c0/player.js", as: "script" },
      { href: "https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js", as: "script" },
    ];

    preloadLinks.forEach(({ href, as }) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement("link");
        link.rel = "preload";
        link.href = href;
        link.as = as;
        document.head.appendChild(link);
      }
    });

    // DNS prefetch links
    const dnsPrefetchDomains = [
      "https://cdn.converteai.net",
      "https://scripts.converteai.net",
      "https://images.converteai.net",
      "https://m3u8.vturb.net",
      "https://api.vturb.com.br",
    ];

    dnsPrefetchDomains.forEach((domain) => {
      if (!document.querySelector(`link[href="${domain}"]`)) {
        const link = document.createElement("link");
        link.rel = "dns-prefetch";
        link.href = domain;
        document.head.appendChild(link);
      }
    });
  }, []);

  return (
    <>
      <Script
        src="https://scripts.converteai.net/7811ed69-550c-4b89-9a28-8ab5dbe8db56/ab-test/69323831c5a3364c7812b1c0/player.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js"
        strategy="afterInteractive"
      />
      {/* @ts-expect-error - Player script is not defined in the global scope */}
      <vturb-smartplayer
        id="vid-6925dff292567ba9d54e15c4"
        style={{
          display: "block",
          margin: "0 auto",
          width: "100%",
          maxWidth: "100%",
          position: "relative",
        }}
      />
    </>
  );

};