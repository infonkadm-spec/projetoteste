import { useEffect } from "react";

export default function VSLBlackKim() {
  useEffect(() => {
    const loadPlayerScript = () => {
      if (document.querySelector('script[src*="6925dff292567ba9d54e15c4"]')) return;
      var s = document.createElement("script");
      s.src = "https://scripts.converteai.net/7811ed69-550c-4b89-9a28-8ab5dbe8db56/players/6925dff292567ba9d54e15c4/v4/player.js";
      s.async = true;
      document.head.appendChild(s);
    };

    loadPlayerScript();

    return () => {
      const existingScript = document.querySelector('script[src*="6925dff292567ba9d54e15c4"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    // @ts-expect-error - Player script is not defined in the global scope
    <vturb-smartplayer
      id="vid-6925dff292567ba9d54e15c4"
      style={{
        display: "block",
        margin: "0 auto",
        width: "100%",
      }}
    />
  );

};