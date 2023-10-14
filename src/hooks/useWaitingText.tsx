import { useEffect, useState } from "react"


interface IuseWaitingText { 
  startLoadingText: () => void;
  stopLoadingText: () => void;
  loadingText: string;
} 

const useWaitingText = (texts: string[], timeInterval: number = 5000): IuseWaitingText => {
  const [loadingText, setLoadingText] = useState<string>(texts[0])
  const [intervalId, setIntervalId] = useState<number>()

  const startLoadingText = () => {
    let index = 0
    const id = setInterval(() => {
      if(index >= texts.length) return
      setLoadingText(texts[index])
      index++
    }, timeInterval)
    setIntervalId(id)
  }

  const stopLoadingText = () => {
    if(!intervalId) return
    clearInterval(intervalId)
    setLoadingText(texts[0])
  }

  useEffect(() => {
    return () => stopLoadingText()
  }, [])

  return{ loadingText, startLoadingText, stopLoadingText }
}

export default useWaitingText
