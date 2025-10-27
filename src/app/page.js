// src/app/page.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Timer from "@/components/Timer";
import Tasks from "@/components/Tasks";
import SettingsModal from "@/components/SettingsModal";
import ReportModal from "@/components/ReportModal";

const LONG_BREAK_INTERVAL = 4;

const convertTimeToSeconds = (timeObject) => {
  const { h = 0, m = 0, s = 0 } = timeObject;
  return (h * 3600) + (m * 60) + s;
};

const getInitialState = (key, defaultValue) => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error reading localStorage key '${key}':`, error);
    return defaultValue;
  }
};

export default function HomePage() {
  const [durations, setDurations] = useState(() => getInitialState('pomofocus-durations', {
    pomodoro: { h: 0, m: 25, s: 0 },
    shortBreak: { h: 0, m: 5, s: 0 },
    longBreak: { h: 0, m: 15, s: 0 },
  }));
  const [tasks, setTasks] = useState(() => getInitialState('pomofocus-tasks', []));
  const [history, setHistory] = useState(() => getInitialState('pomofocus-history', []));
  const [pomodoroCount, setPomodoroCount] = useState(() => getInitialState('pomofocus-pomodoroCount', 0));
  
  const [mode, setMode] = useState('pomodoro');
  const [timeLeft, setTimeLeft] = useState(convertTimeToSeconds(durations.pomodoro));
  const [isActive, setIsActive] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isRinging, setIsRinging] = useState(false);

  const audioRef = useRef(null);
  const hasInteracted = useRef(false);

  useEffect(() => { localStorage.setItem('pomofocus-durations', JSON.stringify(durations)); }, [durations]);
  useEffect(() => { localStorage.setItem('pomofocus-tasks', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem('pomofocus-history', JSON.stringify(history)); }, [history]);
  useEffect(() => { localStorage.setItem('pomofocus-pomodoroCount', JSON.stringify(pomodoroCount)); }, [pomodoroCount]);

  const playSound = () => { if (audioRef.current) { audioRef.current.play(); setIsRinging(true); } };
  const stopSound = () => { if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; } setIsRinging(false); };

  useEffect(() => { if (!isActive) setTimeLeft(convertTimeToSeconds(durations[mode])); }, [durations, mode]);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
        interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
        playSound();
        setIsActive(false);
        if (mode === 'pomodoro') {
            const newPomodoroCount = pomodoroCount + 1;
            setPomodoroCount(newPomodoroCount);
            const newCompletion = { id: Date.now(), date: new Date().toISOString().split('T')[0] };
            setHistory(prevHistory => [...prevHistory, newCompletion]);
        }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);
    
  useEffect(() => {
    const totalSeconds = timeLeft;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    let timeString = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    if (hours > 0) timeString = `${hours < 10 ? '0' : ''}${hours}:` + timeString;
    document.title = `${timeString} - Time to focus!`;
  }, [timeLeft]);

  const toggleTimer = () => {
    if (!hasInteracted.current && !isActive) {
      audioRef.current.play();
      audioRef.current.pause();
      hasInteracted.current = true;
    }
    setIsActive(!isActive);
  };

  const changeMode = (newMode) => {
    stopSound();
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(convertTimeToSeconds(durations[newMode]));
  };

   const handleSaveSettings = (newSettings) => setDurations(newSettings);

  const handleAlarmAcknowledge = () => {
    stopSound();
    if (mode === 'pomodoro') {
      changeMode(pomodoroCount % LONG_BREAK_INTERVAL === 0 ? 'longBreak' : 'shortBreak');
    } else {
      changeMode('pomodoro');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-4">
      <Header onSettingsClick={() => setIsSettingsOpen(true)} onReportClick={() => setIsReportOpen(true)} />
      <main className="w-full flex-grow flex flex-col items-center justify-center -mt-16">
        <Timer timeLeft={timeLeft} mode={mode} setMode={changeMode} toggleTimer={toggleTimer} isActive={isActive} isRinging={isRinging} stopSound={handleAlarmAcknowledge} />
        <Tasks tasks={tasks} setTasks={setTasks} />
      </main>     
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} settings={durations} onSave={handleSaveSettings} />
      <ReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} history={history} pomodoroDuration={durations.pomodoro} />
      <audio ref={audioRef} src="/bell-finish.mp3" onEnded={handleAlarmAcknowledge} />
    </div>
  );
}