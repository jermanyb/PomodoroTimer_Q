import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import Focus from "./Focus";
import TakeBreak from "./TakeBreak";
import TimeControl from "./TimeControl";
import ShowMessage from "./ShowMessage";
import Progression from "./Progression";
//order matters?
//useState stores info that it can modify

function Pomodoro() {
  // Timer starts out paused
  //It returns the variable, isTimerRunning. 
  //It also returns a function, setIsTimerRunning(), that is used to update the state variable.
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentFocus, setCurrentFocus] = useState(25 * 60);
  const [currentBreak, setCurrentBreak] = useState(5 * 60);
  const [actualFocus, setActualFocus] = useState(currentFocus); 
  const [currentMode, setCurrentMode] = useState("focus");
  const [actualBreak, setActualBreak] = useState(currentBreak);
  
  useInterval(
    () => {
      // for every second, change actual focus by 1
      if (currentMode === "focus") {
        setActualFocus((actualFocus) => actualFocus - 1);
      }
      if (actualFocus === 0) {
        setCurrentMode("break");
        setActualBreak(currentBreak); // resets timer
        new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
      }
      if (currentMode !== "focus") {
        setActualBreak((actualBreak) => actualBreak - 1);
      }
      if (actualBreak === 0) {
        setCurrentMode("focus");
        setActualFocus(currentFocus);
        new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
      }
      // ToDo: Implement what should happen when the timer is running
    },
    isTimerRunning ? 1000 : null // if true then call useInterval to countdown 1 second to wait btwn calls, if not do nothing
  );

  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <Focus
            currentFocus={currentFocus}
            setCurrentFocus={setCurrentFocus}
            setActualFocus={setActualFocus}
          />
        </div>
        <div className="col">
          <div className="float-right">
            <TakeBreak
              currentBreak={currentBreak}
              setCurrentBreak={setCurrentBreak}
              setActualBreak={setActualBreak}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <TimeControl
            playPause={playPause}
            isTimerRunning={isTimerRunning}
            currentFocus={currentFocus}
            currentBreak={currentBreak}
            setActualBreak={setActualBreak}
            setActualFocus={setActualFocus}
            setCurrentMode={setCurrentMode}
            setIsTimerRunning={setIsTimerRunning}
          />
        </div>
      </div>
      <div>
        <div className="row mb-2">
          <div className="col">
            <ShowMessage
              currentFocus={currentFocus}
              actualFocus={actualFocus}
              currentBreak={currentBreak}
              actualBreak={actualBreak}
              currentMode={currentMode}
            />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <Progression
            currentFocus={currentFocus}
            actualFocus={actualFocus}
            currentBreak={currentBreak}
            actualBreak={actualBreak}
            currentMode={currentMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
