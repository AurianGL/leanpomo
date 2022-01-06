import { useEffect, useState } from 'react'

const MIN = 1000 * 60

const msToTime = (ms: number) => {
  let seconds = Math.floor(ms / 1000)
  let minutes = Math.floor(ms / (1000 * 60))
  let hours = Math.floor(ms / (1000 * 60 * 60))
  let days = Math.floor(ms / (1000 * 60 * 60 * 24))
  if (seconds < 60) return seconds + ' Sec'
  else if (minutes < 60) return minutes + ' : ' + (seconds % 60)
  else if (hours < 24) return hours + ' Hrs'
  else return days + ' Days'
}

const oizo = new Audio(process.env.PUBLIC_URL + '/oizo.mp3')

const duration = (type: string) => (type === 'session' ? 25 * MIN : 10 * MIN)

const App = () => {
  const [sec, setSec] = useState<number>(25 * MIN)
  const [run, setRun] = useState<string>('stop')
  const [type, setType] = useState<string>('session')

  useEffect(() => {
    if (type === 'session') {
      setSec(25 * MIN)
    }
    if (type === 'break') {
      setSec(10 * MIN)
    }
  }, [type])

  const onStop = () => {
    setRun('stop')
    setType((type) => (type === 'session' ? 'break' : 'session'))
  }

  useEffect(() => {
    const timer =
      sec > 0 &&
      setInterval(() => {
        if (run === 'start') {
          setSec((sec) => sec - 1000 * 10)
        }
      }, 1000 * 10)
    if (run === 'stop') {
      oizo.pause()
      timer && clearInterval(timer)
    }
    if (run === 'pause') {
      timer && clearInterval(timer)
    }
    return timer ? () => clearInterval(timer) : undefined
  }, [run, sec])

  useEffect(() => {
    if (sec === MIN) {
      oizo.play()
      oizo.volume = 0.1
    }
    if (sec < MIN) {
      oizo.volume = oizo.volume + 0.1
    }
    if (sec === 0) {
      setRun('stop')
      setType((type) => (type === 'session' ? 'break' : 'session'))
    }
  }, [sec])

  return (
    <div className="bg-gray-800 text-gray-300 flex flex-col items-center h-screen py-2">
      <h1 className="font-light text-xl">{sec && msToTime(sec)}</h1>
      <div className="m-2">
        <div className="w-64 h-6 bg-gray-600 relative border-x-2 border-gray-600 ">
          <div
            className="w-full h-6 bg-gray-800 right-0 absolute"
            style={{ width: `${(sec / duration(type)) * 100}%` }}
          ></div>
        </div>
      </div>
      <div className="flex gap-1 py-1">
        <button
          className={run === 'start' ? 'text-gray-300' : 'text-gray-600'}
          onClick={() => setRun('start')}
          disabled={run === 'play'}
        >
          <svg
            className="h-7 w-7"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="PlayArrowIcon"
            fill="currentColor"
          >
            <path d="M8 5v14l11-7z"></path>
          </svg>
        </button>
        <button
          className={run === 'pause' ? 'text-gray-300' : 'text-gray-600'}
          onClick={() => setRun('pause')}
          disabled={run === 'pause' || run === 'stop'}
        >
          <svg
            className="h-7 w-7"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="PauseIcon"
            fill="currentColor"
          >
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
          </svg>
        </button>
        <button
          className={run === 'stop' ? 'text-gray-300 ' : 'text-gray-600'}
          onClick={onStop}
          disabled={run === 'stop'}
        >
          <svg
            className="h-7 w-7"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="StopIcon"
            fill="currentColor"
          >
            <path d="M6 6h12v12H6z"></path>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default App
