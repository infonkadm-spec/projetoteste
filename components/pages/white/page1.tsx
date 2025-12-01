/* eslint-disable @typescript-eslint/no-explicit-any */

import Button from "@/components/button";
import { CheckCircle2, Star } from "lucide-react";

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
            <Star size={20} className="text-yellow-500" />
            <span className="text-2xl font-bold text-gray-900">Welcome to Insight Rewards!</span>
            <Star size={20} className="text-yellow-500" />
          </div>
          <p className="text-sm text-gray-600 px-2">
            A platform where you can take part in simple user experiences and learn how our evaluation system works in a practical and engaging way.
          </p>
        </div>

        {/* Highlighted Information Box */}
        <div className="rounded-lg border-2 border-dashed border-green-300 bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-700 text-center">
            No prior experience is required. Just take a few minutes a day to participate and explore how the program functions.
          </p>
        </div>

        {/* How It Works Section */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 size={18} className="text-green-600" />
            <h2 className="text-lg font-semibold text-gray-900">How it works</h2>
          </div>
          <ul className="flex flex-col gap-2 text-sm text-gray-700 px-4">
            <li>• You take part in short interactive activities</li>
            <li>• Each step helps you understand how the evaluation process operates</li>
            <li>• As you continue, you unlock access to new sections and features inside the platform</li>
          </ul>
          <p className="text-center text-sm text-gray-600 italic">
            Clear, simple, and easy to follow.
          </p>
        </div>

        {/* Call to Action Section */}
        <div className="flex flex-col gap-2 text-center">
          <div className="flex items-center justify-center gap-2">
            <Star size={18} className="text-yellow-500" />
            <h2 className="text-lg font-semibold text-gray-900">Start by completing your first activities</h2>
          </div>
          <p className="text-sm text-gray-600">
            Follow the next steps and begin exploring the platform.
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