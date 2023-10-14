import { useCallback, useEffect, useState } from "react"


type TimeState = { minutes: number; seconds: number }

interface IuseTimer { 
  currentTime: TimeState;
  start: () => void;
  reset: () => void;
  isDone: boolean;
} 

const useTimer = (time: number, isMinute?: boolean): IuseTimer => {
  const [currentTime, setCurrentTime] = useState<TimeState>(() => {
    const minutes = isMinute ? time : 0
    const seconds = isMinute ? 0 : time
    return { seconds, minutes }
  })
  const [isDone, setIsDone] = useState<boolean>(false)
  const [intervalId, setIntervalId] = useState<number | null>(null)

  const start = useCallback(() => {
    let minutes = isMinute ? time : 0
    let seconds = isMinute ? 0 : time

    setIntervalId(setInterval(() => {
      if(minutes <= 0 && seconds <= 0) {
        setIsDone(true)
        reset()
        return
      }

      if(minutes > 0 && seconds <= 0) {
        minutes -= 1
        seconds = 60
        return
      }

      seconds -= 1
      setCurrentTime({ minutes, seconds })
    }, 1000))
  }, [])

  const reset = () => {
    if (intervalId) clearInterval(intervalId!)
    setCurrentTime({
      minutes: 0,
      seconds: 0
    })
  }

  useEffect(() => {
    if(intervalId) reset()
    setIsDone(false)
  }, [])

  return { currentTime, reset, start, isDone}
}

export default useTimer
