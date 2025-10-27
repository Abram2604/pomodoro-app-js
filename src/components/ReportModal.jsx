// src/components/ReportModal.jsx
"use client";
import { IoClose } from "react-icons/io5";


const convertTimeToSeconds = (timeObject) => {
    const { h = 0, m = 0, s = 0 } = timeObject;
    return (h * 3600) + (m * 60) + s;
};

export default function ReportModal({ isOpen, onClose, history, pomodoroDuration }) {
    if (!isOpen) return null;

    const todayString = new Date().toISOString().split('T')[0];
    const todaySessions = history.filter(session => session.date === todayString);
    const todayPomodoros = todaySessions.length;

    const singleSessionSeconds = convertTimeToSeconds(pomodoroDuration);
    const totalFocusSeconds = todayPomodoros * singleSessionSeconds;
    const todayFocusTime = (totalFocusSeconds / 60).toFixed(1); 

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-lg p-6 w-full max-w-md text-black relative" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                    <h2 className="text-xl font-bold">Report</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-black"><IoClose size={24} /></button>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold text-center mb-4">Focus Report for Today</h3>
                    <div className="bg-gray-100 p-4 rounded-lg text-center">
                        <p className="text-4xl font-bold">{todayPomodoros}</p>
                        <p className="text-gray-600">Pomodoros Completed</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg text-center">
                        <p className="text-4xl font-bold">{todayFocusTime}m</p>
                        <p className="text-gray-600">Focus Time</p>
                    </div>
                </div>

                <div className="flex justify-end mt-6 border-t pt-4">
                    <button onClick={onClose} className="bg-gray-800 text-white px-8 py-3 rounded-md hover:bg-gray-700">OK</button>
                </div>
            </div>
        </div>
    );
}