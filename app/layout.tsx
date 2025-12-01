import WhiteContent from "@/components/pages/white/home";
import HeaderScript from "@/components/header-script";
import { getUserLayer } from "@/utils/get-user-layer";
import { LayerProvider } from "@/context/layer-provider";
import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import { headers, cookies } from "next/headers";
import "@/app/globals.css";

const redHatDisplay = Red_Hat_Display({
  variable: "--font-red-hat-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Rewards Program",
  description: "This new YouTube tool is scaring experts around the world.",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // GET DOMAIN ID
  const cks = await cookies();
  const hdrs = await headers();
  const host = hdrs.get('x-host') || '';
  const catParam = cks.get('xcat_valid');
  const rawContent = catParam?.value || '';
  // VALIDATE CONTENT - ensure it's a valid variation or default to 'kim'
  const validVariations = ['kim', 'rock', 'megan'];
  const content = (rawContent && validVariations.includes(rawContent)) ? rawContent : 'kim';
  const params = hdrs.get('x-params') || '';
  
  // GET USER LAYER
  const userLayer = await getUserLayer({ cks, hdrs });

  // BODY CLASS
  const bodyClassName = `flex flex-col min-w-[350px] items-center select-none ${redHatDisplay.variable} antialiased`;
    
  return (
    <html lang="es">
      <head>
        <HeaderScript />
      </head>
      <body className={bodyClassName} suppressHydrationWarning>
        {userLayer === 1 ?
          <WhiteContent />
        : (
          <LayerProvider
            host={host}
            layer={userLayer}
            params={params}
            content={content}
          >
            {children}
          </LayerProvider>
        )}
      </body>
    </html>
  );
  
};