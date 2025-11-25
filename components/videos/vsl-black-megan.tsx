import { useEffect } from "react";

export default function VSLBlackMegan() {
  useEffect(() => {
    const loadPlayerScript = () => {
      if (document.querySelector('script[src*="6925e0122126a6cf9409a026"]')) return;
      const script = document.createElement("script");
      script.src = "https://scripts.converteai.net/7811ed69-550c-4b89-9a28-8ab5dbe8db56/players/6925e0122126a6cf9409a026/v4/player.js";
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
      const existingScript = document.querySelector('script[src*="6925e0122126a6cf9409a026"]');
      if (existingScript) {
        existingScript.remove();
      };
    };
  }, []);

  return (
    // @ts-expect-error - Player script is not defined in the global scope
    <vturb-smartplayer
      id="vid-6925e0122126a6cf9409a026"
      style={{
        display: "block",
        margin: "0 auto",
        width: "100%",
      }}
    />
  );

};