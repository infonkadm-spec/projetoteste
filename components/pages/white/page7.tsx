import VSLGray from '@/components/videos/vsl-gray';
import Button from "@/components/button";
import { useEffect, useState } from 'react';

export default function Page7() {

  const [visible, setVisible] = useState<boolean>(false);
  const videoId = "692d0c14b62eb74d1b6c85c0";
  const pitchTime = 850;

  // VIDEO VERIFY
  useEffect(() => {
    if (visible) return;

    const intervalId = setInterval(() => {
      const storedResumeTime = Number(localStorage.getItem(videoId + '-resume') || 0);
      const storedPlainTime = Number(localStorage.getItem(videoId) || 0);
      const storedVideoTime = Math.max(storedResumeTime, storedPlainTime);

      if (storedVideoTime > pitchTime) {
        setVisible(true);
      }
    }, 1000);

    const timeoutId = setTimeout(() => {
      setVisible(true);
    }, (pitchTime + 5) * 1000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [videoId, pitchTime, visible]);

  return (
    <>
      <div className="flex flex-col text-center text-base rounded-2xl gap-5 bg-gradient-to-t appear px-2 pt-7 pb-2 from-gray-50 to-gray-200">
        <span className="text-base sm:text-xl font-semibold tracking-tight">
          🎥 ATTENTION! Watch the video until the end to understand the next step. ⬇️
        </span>
      </div>

      <div className="flex items-center flex-col gap-8 relative">
        <VSLGray />
      </div>

      {visible && (
        <div className="flex justify-center mt-4">
          <Button className="!bg-[#37b569] hover:!bg-[#2d9a56] !text-white !px-8 !py-4 !text-xl !rounded-xl !w-auto max-w-[320px]">
            Next step
          </Button>
        </div>
      )}

      <div className="text-sm text-center p-2 mt-4">
        🔊 Make sure your sound is enabled
      </div>
    </>
  );
}
