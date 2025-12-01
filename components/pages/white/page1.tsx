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
          <span className="text-xl font-semibold">Welcome to Insight Rewards! 🌟</span>
          <span>A simple platform where you can take part in brief evaluations and explore how our point-based system works.</span>
        </div>
        <div className="rounded-lg border-2 border-dashed shadow-lg p-5 bg-green-50 border-green-500">
          <div className="flex flex-col gap-2">
            <span className="font-semibold">No experience needed</span>
            <span className="text-sm">Just take a few minutes each day to complete short activities and become familiar with the program.</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-left">
          <span className="text-base font-semibold text-center">How it works</span>
          <ul className="flex flex-col gap-2 list-none text-sm space-y-1">
            <li>• You join small evaluations inside the platform</li>
            <li>• You earn points as you complete each step</li>
            <li>• Points can be used to access features, benefits, and tools available within the platform</li>
          </ul>
          <span className="text-center text-sm font-medium">Clear, simple and easy to follow.</span>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-base font-semibold">⭐ Get started with your first evaluations</span>
          <span>Complete the next steps to begin exploring the system and unlock your initial points.</span>
        </div>
      </div>
      <Button onClick={() => setPage(page + 1)} className="!bg-green-600 !border-green-700 hover:!bg-green-500">
        Start now
      </Button>
      <ConfettiEffect />
    </>
  );

};