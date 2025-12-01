/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import Page1 from "@/components/pages/white/page1";
import Page2 from "@/components/pages/white/page2";
import Page3 from "@/components/pages/white/page3";
import Page4 from "@/components/pages/white/page4";
import Page5 from "@/components/pages/white/page5";
import Page6 from "@/components/pages/white/page6";
import Page7 from "@/components/pages/white/page7";
import { useState } from "react";

// ROUTES WHITE
const RoutesWhite: Record<number, any> = {
  1: Page1,
  2: Page2,
  3: Page3,
  4: Page4,
  5: Page5,
  6: Page6,
  7: Page7,
};

export default function Home() {

  // SET COMPONENT STATES
  const [page, setPage] = useState(1);

  // SET PAGE CONTENT
  const PageContent = RoutesWhite[page];

  return (
    <div className="flex flex-col w-full max-w-xl gap-5 px-4 py-5 pb-10">
      <PageContent
        page={page}
        setPage={setPage}
      />
      <div className="flex flex-col justify-center text-center gap-3 p-4 text-gray-400/70">
        <span className="text-sm">© 2025 {page === 2 ? "Insight Reviews" : "Insight Rewards"}</span>
        <span className="text-[10px]"><u>Privacy Policy</u> | <u>Terms of Use</u></span>
      </div>
    </div>
  );

};