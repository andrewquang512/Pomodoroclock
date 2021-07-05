import React, { useState, useEffect } from 'react';
import '../../assets/main.css'

const Pomodoroclock = () =>{
    const [BreakLength, setBreakLength] = useState(60 * 5);
    const [SessionLength, setSessionLength] = useState(60 * 25);
    const [TimerLeft, setTimerLeft] = useState(SessionLength);
    const [Status, setStatus] = useState('New');
    const [Type, setType] = useState('Session');
    const Timedisplay = (time) => {
      let minute = Math.floor(time/60);
      let second = time - minute * 60;
      if(minute < 10)  minute = "0" + minute;
      if(second < 10)  second = "0" + second;
      return minute + ":" + second;
    }

    useEffect(() => {
      var timerID;
      if(Status === 'Running'){
        timerID = setInterval(
          () =>{
            const newTimerLeft = TimerLeft - 1;
            if (newTimerLeft >= 0) setTimerLeft(TimerLeft - 1);
            else {
              if(Type === 'Session'){
                setTimerLeft(BreakLength);
                setType('Break');
              }
              else{
                setTimerLeft(SessionLength);
                setType('Session');
              }
            }
          }, 1000 
        );
      };
      if(Status === 'Stop') {
         return ;
      };
      
      return () => clearInterval(timerID);
    }, [Status, TimerLeft, Type , BreakLength, SessionLength]);



    const handleReset = () => {
      setTimerLeft(SessionLength);
      setType('Session');
      setStatus('New');
    }

    const handleStartStop = () => {
      if(Status === 'New') setStatus('Running');
      if(Status === 'Running') setStatus('Stop');
      if(Status === 'Stop') setStatus('Running');
    }
    //TODO: it should have a break status
    return (
    <div class="w-full px-5 py-24 mx-auto bg-green-300">
      <div class="flex flex-col text-center w-full mb-12">
        <h1 class="text-6xl font-medium title-font mb-4 text-gray-900">
          { (Status === 'New' && Type === 'Session') ? "Let's focus"
            : (Status === 'Running' && Type === 'Session') ? "You're doing great, keep up"
            : (Status === 'Stop' && Type === 'Session') ? "Just a little more to done, try hard"
            : "You are awesome, it's time for break"} 
        </h1>
        <h1 class="mt-8 mb-8 mx-auto leading-relaxed text-base text-8xl">
          {Timedisplay(TimerLeft)}
        </h1>
      </div>
      <div class="flex w-9/12 sm:flex-row mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
        <div class="flex relative flex-grow w-full justify-center items-center">
          <button class="px-6 py-6 w-2/6 text-2xl text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          onClick={handleStartStop}>
          { (Status === 'New') ? "Start"
            : (Status === 'Running') ? "Stop"
            : (Status === 'Stop') ? "Resume"
            : "Start"}
          </button>
        </div>
        <div class="flex relative flex-grow w-full justify-center items-center">
          <button class="px-6 py-6 w-2/6 text-2xl text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          onClick={handleReset}>
            Reset
          </button>
        </div>
    </div>
  </div>
    );
};

export default Pomodoroclock;