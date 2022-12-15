import React, { useState, useContext, useEffect } from 'react'
import { createContext } from 'react'


const TimerContext = createContext()

export const TimerProvider = ({ children }) => {

    const [breakTimer, setBreakTimer] = useState(1)
    const [sessionTimer, setSessionTimer] = useState(25)
    const [timerState, setTimerState] = useState("Session")
    const [minutes, setMinutes] = useState(25)
    const [seconds, setSeconds] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [breakSwitch, setBreakSwitch] = useState(false)
    const [intId, setIntId] = useState()

    const countdown = () => {
        return setSeconds(prev => prev > 0 ? prev - 1 : 59)
    }

    useEffect(()=>{         
        if(minutes < 0){
            setMinutes(36)
        }
    },[minutes])

    const startStop = () => {

        if (!isRunning) {
            setIntId(setInterval(countdown, 1000))
            setIsRunning(true)
        } else {
            clearInterval(intId)
            setIsRunning(false)
        }
    }

    useEffect(() => {
        if (seconds === 0 && minutes === 0) {
            timerState === "Session" ? setTimerState("Break"):setTimerState("Session")
            document.getElementById("beep").play();
            clearInterval(intId)
            if (breakSwitch === false) {
                setTimeout(() => {
                    setBreakSwitch(true);
                    setIntId(setInterval(countdown, 1000))
                }, 1000)
            } else {
                setTimeout(() => {
                    setBreakSwitch(false);
                    setIntId(setInterval(countdown, 1000))
                }, 1000)
            }
        } else if (seconds === 59 && minutes !== 0) {
            setMinutes(prev => prev - 1)
        } else {
            setMinutes(minutes)
        }

    }, [seconds])

    useEffect(() => {
        if (breakSwitch) {
            setMinutes(breakTimer)
        } else if (isRunning === true) {
            setMinutes(sessionTimer)
            setBreakSwitch(false)
        }
    }, [breakSwitch])

    const controlHandler = (event) => {

        if (event.target.id === "break-decrement") {
            setBreakTimer(prev => (prev > 1 ? prev - 1 : prev))
        } else if (event.target.id === "break-increment" && breakTimer < 60) {
            setBreakTimer(prev => (prev + 1))
        } else if (event.target.id === "session-decrement") {
            setSessionTimer(prev => (prev > 1 ? prev - 1 : prev))
            if (!isRunning && minutes > 1) {
                setMinutes(prev => prev - 1)
            } else {
                return
            }
        } else if (event.target.id === "session-increment" && sessionTimer < 60) {
            setSessionTimer(prev => (prev + 1))
            if (!isRunning && minutes < 60) {
                setMinutes(prev => prev + 1)
            } else {
                return
            }
        } else if (event.target.id === "start_stop") {
            startStop()
        } else if (event.target.id === "reset") {
            setSessionTimer(25)
            setBreakTimer(5)
            setIsRunning(false)
            clearInterval(intId)
            setMinutes(25)
            setSeconds(0)
            setTimerState("Session")
            document.getElementById("beep").pause();
            document.getElementById("beep").currentTime = 0;

        } else { return }

    }

    const values = {
        breakTimer,
        setBreakTimer,
        sessionTimer,
        setSessionTimer,
        timerState,
        setTimerState,
        controlHandler,
        minutes,
        seconds,
        startStop,

    }
    return <TimerContext.Provider value={values}>{children}</TimerContext.Provider>
}

const useTimer = () => useContext(TimerContext)
export default useTimer