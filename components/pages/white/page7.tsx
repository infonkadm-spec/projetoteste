import CountUp from '@/components/countUp';
import VSLGray from '@/components/videos/vsl-gray';
import { CircleAlert } from 'lucide-react';
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
          🚨 ATTENTION! Watch the video until the end to understand how to withdraw your available balance. ⬇️
        </span>
        {visible && (
          <div className="flex flex-none max-w-max justify-center items-center text-sm font-bold rounded-lg border-2 animate-pulse gap-1.5 mx-auto px-2.5 py-2 z-50 text-red-800 border-red-200 bg-red-100">
            <CircleAlert size={20} className="flex-none" />
            <div>
              <span>ONLY</span>
              <span className="rounded px-2 py-0.5 mx-1.5 text-white bg-red-500">
                <CountUp start={100} end={3} duration={150000} />
              </span>
              <span>PLACES!</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex items-center flex-col gap-8 relative">
        <VSLGray />
      </div>

      <div className="text-sm text-center p-2">
        🔊 Check if your sound is activated
      </div>
    </>
  );
}
