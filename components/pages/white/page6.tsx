/* eslint-disable @typescript-eslint/no-explicit-any */

import Button from "@/components/button";
import ConfettiEffect from "@/components/confetti";

export default function Page6({
  page,
  setPage,
}:{
  page: number,
  setPage: any,
}) {

  return (
    <>
      <div className="flex flex-col text-center text-base rounded-2xl gap-7 bg-gradient-to-t appear px-8 py-10 from-gray-50 to-gray-200">
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-semibold">🎉 Great job! 🎉</span>
          <span className="text-base font-normal">Your progress has been successfully updated! ✨</span>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-base font-normal">Your results for the 4 evaluations you just completed are now available.</span>
          <span className="text-sm text-gray-700">You can now check your progress and see the next steps inside the guide below 👇</span>
        </div>
      </div>
      <Button onClick={() => setPage(page + 1)} className="!bg-green-600 !border-green-700 hover:!bg-green-500">
        ✔️ Yes, show me my progress!
      </Button>
      <ConfettiEffect />
    </>
  );

};