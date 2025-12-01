/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";
import Option from "@/components/option";
import { Frown, Meh, Smile } from "lucide-react";

export default function Page1({
  page,
  setPage,
}:{
  page: number,
  setPage: any,
}) {

  return (
    <>
      <div className="flex flex-col gap-6 text-base appear">
        <div className="flex flex-col gap-2 text-center mb-2">
          <span className="text-xl font-bold text-gray-900">User Feedback Session</span>
        </div>
        
        <div className="text-center text-sm text-gray-600 mb-1">
          <span>🔎 Sample Thumbnail Preview</span>
        </div>

        <div className="rounded-3xl border shadow-lg p-6 sm:p-7 bg-gray-200 border-gray-400/10 shadow-black/5">
          <Image
            width="500"
            height="367"
            src="/thumbs/etapa1.webp"
            alt="Thumbnail"
            priority
          />
        </div>

        <div className="flex flex-col gap-2 text-center px-2">
          <span className="text-base font-semibold text-gray-900">Thumbnail Review – Your Opinion Matters</span>
          <span className="text-sm text-gray-600">Below is an example of a video thumbnail used for visual testing and feedback purposes.</span>
        </div>

        <div className="flex flex-col gap-2 text-center mt-2">
          <span className="text-lg font-semibold">How would you describe your reaction to this thumbnail?</span>
          <span className="text-gray-600 text-sm">Please select one option below 👇</span>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Option onClick={() => setPage(page + 1)}>
            <div className="flex flex-col items-center gap-1">
              <Smile size={45} className="text-green-300" />
              <span className="text-xs text-gray-600">😊 Positive</span>
            </div>
          </Option>
          <Option onClick={() => setPage(page + 1)}>
            <div className="flex flex-col items-center gap-1">
              <Meh size={45} className="text-yellow-500" />
              <span className="text-xs text-gray-600">😐 Neutral</span>
            </div>
          </Option>
          <Option onClick={() => setPage(page + 1)}>
            <div className="flex flex-col items-center gap-1">
              <Frown size={45} className="text-red-500" />
              <span className="text-xs text-gray-600">☹️ Negative</span>
            </div>
          </Option>
        </div>
      </div>
    </>
  );

};