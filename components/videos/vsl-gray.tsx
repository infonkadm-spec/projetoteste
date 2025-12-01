import { useEffect } from "react";

export default function VSLBlackV1() {
  useEffect(() => {
    const loadPlayerScript = () => {
      if (document.querySelector('script[src*="692d0c14b62eb74d1b6c85c0"]')) return;
      const script = document.createElement("script");
      script.src = "https://scripts.converteai.net/7811ed69-550c-4b89-9a28-8ab5dbe8db56/players/692d0c14b62eb74d1b6c85c0/v4/player.js";
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
      const existingScript = document.querySelector('script[src*="692d0c14b62eb74d1b6c85c0"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    // @ts-expect-error - Player script is not defined in the global scope
    <vturb-smartplayer 
      id="vid-692d0c14b62eb74d1b6c85c0" 
      style={{ 
        width: "100%",
        margin: "0 auto", 
        display: "block",
        "--player-border-radius": "20px",
        "--player-box-shadow": "0 5px 5px 0 rgba(0, 0, 0, 0.2)",
      }} 
    />
  );

};