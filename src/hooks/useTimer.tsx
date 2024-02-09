import { useCallback, useEffect, useState } from "react";

type TimeState = { minutes: number; seconds: number };

interface IuseTimer {
  currentTime: TimeState;
  start: () => void;
  reset: () => void;
  isDone: boolean;
}

const useTimer = (time: number, isMinute?: boolean): IuseTimer => {
  const [currentTime, setCurrentTime] = useState<TimeState>(() => {
    const minutes = isMinute ? time : 0;
    const seconds = isMinute ? 0 : time;
    return { seconds, minutes };
  });
  const [isDone, setIsDone] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

const start = useCallback(() => {
  let currentMinutes = isMinute ? time : 0;
  let currentSeconds = isMinute ? 0 : time;

  setIntervalId(
    setInterval(() => {
      if (currentMinutes <= 0 && currentSeconds <= 0) {
        setIsDone(true);
        reset();
        return;
      }

      if (currentMinutes > 0 && currentSeconds <= 0) {
        currentMinutes -= 1;
        currentSeconds = 59; // Adjust seconds to 59 when transitioning from minutes to seconds
      } else {
        currentSeconds -= 1;
      }
      
      setCurrentTime({ minutes: currentMinutes, seconds: currentSeconds });
    }, 1000)
  );
}, []);


  const reset = () => {
    if (intervalId) clearInterval(intervalId!);
    setCurrentTime({
      minutes: 0,
      seconds: 0,
    });
  };

  useEffect(() => {
    if (intervalId) reset();
    setIsDone(false);
  }, []);

  return { currentTime, reset, start, isDone };
};

export default useTimer;
