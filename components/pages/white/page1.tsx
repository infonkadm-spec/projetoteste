/* eslint-disable @typescript-eslint/no-explicit-any */

import Button from "@/components/button";
import { Sun, CheckCircle2, Star } from "lucide-react";

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
        {/* Header Section */}
        <div className="flex flex-col gap-3 text-center">
          <div className="flex items-center justify-center gap-2">
            <Sun size={20} className="text-yellow-500" />
            <span className="text-2xl font-bold text-gray-900">Welcome to Insight Rewards!</span>
            <Sun size={20} className="text-yellow-500" />
          </div>
          <p className="text-sm text-gray-600 px-2">
            A platform where you can participate in simple evaluations and accumulate points that can be exchanged for rewards within the system itself.
          </p>
        </div>

        {/* Highlighted Information Box */}
        <div className="rounded-lg border-2 border-dashed border-green-300 bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-700 text-center">
            No prior experience is necessary. Just dedicate a few minutes a day to answer quick analyses and learn how the program works.
          </p>
        </div>

        {/* How It Works Section */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 size={18} className="text-purple-500" />
            <h2 className="text-lg font-semibold text-gray-900">How it works</h2>
          </div>
          <ul className="flex flex-col gap-2 text-sm text-gray-700 px-4">
            <li>• You participate in small evaluations</li>
            <li>• Accumulate points upon completing each step</li>
            <li>• Afterwards, you can exchange your points for benefits and rewards within the platform.</li>
          </ul>
          <p className="text-center text-sm text-gray-600 italic">
            Simple, direct, and transparent.
          </p>
        </div>

        {/* Call to Action Section */}
        <div className="flex flex-col gap-2 text-center">
          <div className="flex items-center justify-center gap-2">
            <Star size={18} className="text-yellow-500" />
            <h2 className="text-lg font-semibold text-gray-900">Start by filling out your first evaluations</h2>
          </div>
          <p className="text-sm text-gray-600">
            Complete the next steps and unlock your first points.
          </p>
        </div>

        {/* Main Action Button */}
        <Button onClick={() => setPage(page + 1)} className="!bg-green-600 !border-green-700 hover:!bg-green-500">
          Start now
        </Button>
      </div>
    </>
  );

};