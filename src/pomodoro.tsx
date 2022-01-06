// a pomodoro react component

import { useEffect, useState } from 'react'

export default function Pomodoro() {
  const [run, setRun] = useState('stop')
  const [time, setTime] = useState(25 * 60)
  const [breakTime, setBreakTime] = useState(5 * 60)
  const [session, setSession] = useState(true)
  const [sessionName, setSessionName] = useState('Session')
  const [sessionCount, setSessionCount] = useState(0)
  const [breakCount, setBreakCount] = useState(0)

  const handleStart = () => {
    setRun('start')
  }

  const handlePause = () => {
    setRun('pause')
  }

  const handleStop = () => {
    setRun('stop')
    setSession(true)
    setSessionName('Session')
    setSessionCount(0)
    setBreakCount(0)
    setTime(25 * 60)
    setBreakTime(5 * 60)
  }

  const handleReset = () => {
    setRun('stop')
    setSession(true)
    setSessionName('Session')
    setSessionCount(0)
    setBreakCount(0)
    setTime(25 * 60)
    setBreakTime(5 * 60)
  }

  const handleSession = () => {
    setSession(true)
    setSessionName('Session')
    setSessionCount(0)
    setBreakCount(0)
  }

  const handleBreak = () => {
    setSession(false)
    setSessionName('Break')
    setSessionCount(0)
    setBreakCount(0)
  }

  const handleTime = () => {
    if (session) {
      setSessionCount(sessionCount + 1)
      if (sessionCount === 4) {
        setSessionCount(0)
        setBreakCount(breakCount + 1)
        setSession(false)
        setSessionName('Break')
      }
    } else {
      setBreakCount(breakCount + 1)
      if (breakCount === 4) {
        setBreakCount(0)
        setSessionCount(sessionCount + 1)
        setSession(true)
        setSessionName('Session')
      }
    }
  }

  useEffect(() => {
    const timer =
      time > 0 &&
      setInterval(() => {
        if (run === 'start') {
          setTime((time) => time - 1)
        }
      }, 1000)
    if (run === 'stop') {
      timer && clearInterval(timer)
      setTime(25 * 60)
    }
    if (run === 'pause') {
      timer && clearInterval(timer)
    }
    return timer ? () => clearInterval(timer) : undefined
  }, [run, time])

  useEffect(() => {
    if (time === 60) {
      handleTime()
    }
  }, [time])

  return (
    <div className="bg-gray-800 text-gray-300 flex flex-col items-center h-screen">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Pomodoro Clock</h1>
        <div className="flex flex-col gap-1">
          <div className="flex justify-center">
            <button
              className="text-gray-800 bg-gray-300 rounded-full"
              onClick={handleStart}
            >
              Start
            </button>
            <button
              className="text-gray-800 bg-gray-300 rounded-full"
              onClick={handlePause}
            >
              Pause
            </button>
            <button
              className="text-gray-800 bg-gray-300 rounded-full"
              onClick={handleStop}
            >
              Stop
            </button>
          </div>
          <div className="flex justify-center">
            <button
              className="text-gray-800 bg-gray-300 rounded-full"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-center">
            <button
              className="text-gray-800 bg-gray-300 rounded-full"
              onClick={handleSession}
            >
              Session
            </button>
            <button
              className="text-gray-800 bg-gray-300 rounded-full"
              onClick={handleBreak}
            >
              Break
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-center">
            <h1 className="text-4xl font-bold">{sessionName}</h1>
          </div>
          <div className="flex justify-center">
            <h1 className="text-4xl font-bold">{sessionCount}</h1>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-center">
            <h1 className="text-4xl font-bold">{breakCount}</h1>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-center">
            <h1 className="text-4xl font-bold">
              {Math.floor(time / 60)}:{time % 60}
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}
