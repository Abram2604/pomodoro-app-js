// src/components/Timer.jsx

const formatTime = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  let display = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  if (hours > 0) {
    display = `${hours < 10 ? '0' : ''}${hours}:${display}`;
  }
  return display;
};

export default function Timer({ mode, setMode, timeLeft, toggleTimer, isActive, isRinging, stopSound }) {
  const modes = [
    { id: 'pomodoro', label: 'Pomodoro' },
    { id: 'shortBreak', label: 'Short Break' },
    { id: 'longBreak', label: 'Long Break' },
  ];

  return (
    <div className="bg-white/10 p-6 sm:p-8 rounded-lg max-w-xl mx-auto w-full text-center">
      <div className="flex justify-center gap-2 mb-6">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`px-4 py-1 rounded-md text-sm font-semibold ${
              mode === m.id ? 'bg-black/20' : 'hover:bg-black/10'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="relative text-7xl sm:text-8xl md:text-9xl font-bold mb-6">
        {isRinging ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
            <button
              onClick={stopSound}
              className="bg-white text-[#BA4949] text-2xl font-bold py-3 px-16 rounded-md shadow-lg transform hover:scale-105 transition-transform"
            >
              STOP
            </button>
          </div>
        ) : (
          formatTime(timeLeft)
        )}
      </div>

      {!isRinging && (
        <button
          onClick={toggleTimer}
          className="bg-white text-[#BA4949] text-2xl font-bold py-3 px-16 rounded-md shadow-lg transform hover:scale-105 transition-transform"
        >
          {isActive ? 'PAUSE' : 'START'}
        </button>
      )}
    </div>
  );
}