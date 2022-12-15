import React from 'react'
import useTimer from '../context'

function Display() {

  const { 
    minutes,
    seconds,
    timerState,
    controlHandler,
    isRunning
   } = useTimer()

  return (
    <div id='display'>
        <div id="timer-label">{timerState}</div>
        <div id="time-left">
         {minutes.toString().padStart(2,0)}:{seconds.toString().padStart(2,0)}
        </div>
        <button onClick={controlHandler} id="start_stop" className='buttons display-button'>⏵︎</button>
        <button onClick={controlHandler} id="reset" className='buttons display-button'>⏹︎</button>
        <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
    </div>
  )
}

export default Display