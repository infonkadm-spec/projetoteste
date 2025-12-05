import Progress from "@/components/progress";
import HotmartUpsell from "@/components/hotmart-upsell";
import Logo from "@/components/logo";

export default function Page() {

  return (
    <>
      <div className="w-full text-sm bg-red-600 text-white">
        <div className="mx-auto px-4 py-4">
          <div className="text-center font-semibold">
            Please do not close or refresh this page, as errors may occur when paying the fee!
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full max-w-xl gap-6 px-5 py-6 bg-white">
        <div className="flex justify-between items-center w-full">
          <Logo />
          <div className="flex flex-col items-end rounded-lg border-2 border-dashed border-green-400 bg-green-50 p-3">
            <span className="text-xs font-semibold uppercase leading-3 text-gray-700">
              YOUR BALANCE:
            </span>
            <span className="text-2xl font-bold leading-none text-green-600">
              US$ 180
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2.5 text-center">
          <span className="text-sm">
            We are processing your fee payment...
          </span>
          <Progress progress={67} />
        </div>
        <div className="flex flex-col text-center text-sm rounded-3xl gap-5 bg-white border-2 border-gray-200 px-5 py-6 shadow-sm">
          <div className="flex flex-col gap-3">
            <div className="text-xl font-bold text-gray-900">
              🎉 CONGRATULATIONS! YOU WON A SURPRISE! 🎁
            </div>
            <div className="text-base text-gray-700">
              CLICK THE GREEN BUTTON BELOW AND RECEIVE IT IMMEDIATELY!
            </div>
          </div>
          <HotmartUpsell black={false} />
        </div>
      </div>
    </>  
  );

};