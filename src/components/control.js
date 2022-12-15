import React from 'react'
import useTimer from '../context'

function Control() {

    const { breakTimer,
        sessionTimer,
        controlHandler,
    } = useTimer()

    return (
        <div id='control'>
            <h1>Pomodoro Clock</h1>
            <div id="controls">
                <div className="length-control">
                    <div id="break-label">Break Length</div>
                    <div className="button-wrapper">
                        <button onClick={controlHandler} id="break-decrement" className='buttons'>-</button>
                        <span id="break-length">
                            {breakTimer}
                        </span>
                        <button onClick={controlHandler} id="break-increment" className='buttons'>+
                        </button>
                    </div>
                </div>
                <div className="length-control">
                    <div id="session-label">Session Length</div>
                    <div className="button-wrapper">
                        <button onClick={controlHandler} id="session-decrement" className='buttons'>-</button>
                        <span id="session-length">
                            {sessionTimer}
                        </span>
                        <button onClick={controlHandler} id="session-increment" className='buttons'>+</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Control