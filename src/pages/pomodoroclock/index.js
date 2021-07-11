import React, { useState, useEffect } from 'react';
import Styles from '../../assets/pomodoroclock/styles';
import '../../assets/main.css'

const Pomodoroclock = () =>{
    const [BreakLength, setBreakLength] = useState(60 * 5);
    const [SessionLength, setSessionLength] = useState(60 * 2);
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
              const url = "http://streaming.tdiradio.com:8000/house.mp3";
              const audio = new Audio(url);
              audio.play();
              if(Type === 'Session'){
                setTimerLeft(BreakLength);
                setType('Break');
              }
              else{
                setTimerLeft(SessionLength);
                setType('Session');
              }
            }
          }, 10 
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
    <div className={Styles.container}>
      <div className={Styles.main}>
        <h1 className={Styles.title}>
          { (Status === 'New' && Type === 'Session') ? "Can you focus in 25 minutes?"
            : (Status === 'Running' && Type === 'Session') ? "You're doing great, keep up"
            : (Status === 'Stop' && Type === 'Session') ? "Just a little more to done, try hard"
            : "You are awesome, it's time for break"} 
        </h1>
        <h1 className={Styles.time}>
          {Timedisplay(TimerLeft)}
        </h1>
      </div>
      <div className={Styles.controller}>
        <div className={Styles.center_flex_container}>
          <button className={Styles.button}
          onClick={handleStartStop}>
          { (Status === 'New') ? "Start"
            : (Status === 'Running') ? "Stop"
            : (Status === 'Stop') ? "Resume"
            : "Start"}
          </button>
        </div>
        <div className={Styles.center_flex_container}>
          <button className={Styles.button}
          onClick={handleReset}>
            Reset
          </button>
        </div>
    </div>
  </div>
    );
};

export default Pomodoroclock;