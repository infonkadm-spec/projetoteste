/* eslint-disable @typescript-eslint/no-explicit-any */

import Button from "@/components/button";
import ConfettiEffect from "@/components/confetti";

export default function Page1({
  page,
  setPage,
}:{
  page: number,
  setPage: any,
}) {

  return (
    <>
      <div className="flex flex-col text-center text-sm rounded-3xl gap-7 bg-gradient-to-t appear border-t px-8 py-8 from-gray-50 to-gray-200/50 border-gray-300">
        <div className="flex flex-col gap-4">
          <span className="text-xl font-semibold">🌟 Welcome to Insight Rewards! 🌟</span>
          <span>A platform where you can participate in simple evaluations and accumulate points that can be exchanged for rewards within the system itself.</span>
        </div>
        <div className="rounded-lg border-2 border-dashed shadow-lg p-5 bg-green-50 border-green-500">
          <span className="font-semibold">No experience required. Just dedicate a few minutes a day to answer quick analyses and learn how the program works.</span>
        </div>
        <div className="flex flex-col gap-4 text-left">
          <span className="text-base font-semibold text-center">✔️ How it works</span>
          <ul className="flex flex-col gap-2 list-none text-sm space-y-1">
            <li>• You participate in small evaluations</li>
            <li>• Accumulate points as you complete each step</li>
            <li>• Then you can exchange your points for benefits and rewards within the platform</li>
          </ul>
          <span className="text-center text-sm font-medium">Simple, direct and transparent.</span>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-base font-semibold">⭐ Start by completing your first evaluations</span>
          <span>Complete the next steps and unlock your first points.</span>
        </div>
      </div>
      <Button onClick={() => setPage(page + 1)} className="!bg-green-600 !border-green-700 hover:!bg-green-500">
        Start now
      </Button>
      <ConfettiEffect />
    </>
  );

};