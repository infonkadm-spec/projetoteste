import { useEffect } from "react";

export default function VSLBlackKim() {
  useEffect(() => {
    const loadPlayerScript = () => {
      if (document.querySelector('script[src*="69324e13afcc411b3a71e97e"]')) return;
      const script = document.createElement("script");
      script.src = "https://scripts.converteai.net/7811ed69-550c-4b89-9a28-8ab5dbe8db56/ab-test/69324e13afcc411b3a71e97e/player.js";
      script.async = true;
      script.onload = () => {
        console.log("Player script loaded successfully");
      };
      script.onerror = () => {
        console.error("Failed to load player script");
      };
      document.head.appendChild(script);
    };

    loadPlayerScript();

    return () => {
      const existingScript = document.querySelector('script[src*="69324e13afcc411b3a71e97e"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    // @ts-expect-error - Player script is not defined in the global scope
    <vturb-smartplayer
      id="ab-69324e13afcc411b3a71e97e"
      style={{
        display: "block",
        margin: "0 auto",
        width: "100%",
      }}
    />
  );

};