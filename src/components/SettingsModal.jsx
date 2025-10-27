// src/components/SettingsModal.jsx
"use client";
import { useState, useEffect } from 'react';
import { IoClose } from "react-icons/io5";

const TimeInput = ({ label, value, onChange }) => (
    <div className="flex flex-col">
        <label className="text-gray-500 text-sm mb-1">{label}</label>
        <div className="flex items-center gap-1 bg-gray-200 p-2 rounded-md">
            <input type="number" min="0" value={value.h} onChange={(e) => onChange('h', e.target.value)} className="w-full bg-transparent outline-none text-center" placeholder="H" />
            <span>:</span>
            <input type="number" min="0" max="59" value={value.m} onChange={(e) => onChange('m', e.target.value)} className="w-full bg-transparent outline-none text-center" placeholder="M" />
            <span>:</span>
            <input type="number" min="0" max="59" value={value.s} onChange={(e) => onChange('s', e.target.value)} className="w-full bg-transparent outline-none text-center" placeholder="S" />
        </div>
    </div>
);

export default function SettingsModal({ isOpen, onClose, settings, onSave }) {
    const [localSettings, setLocalSettings] = useState(settings);

    useEffect(() => {
        setLocalSettings(settings);
    }, [isOpen, settings]);

    if (!isOpen) return null;


    const handleInputChange = (mode, unit, value) => {
        setLocalSettings(prev => ({
            ...prev,
            [mode]: {
                ...prev[mode],
                [unit]: value, 
            }
        }));
    };

    const handleSave = () => {
        const settingsAsNumbers = {
            pomodoro: {
                h: parseInt(localSettings.pomodoro.h) || 0,
                m: parseInt(localSettings.pomodoro.m) || 0,
                s: parseInt(localSettings.pomodoro.s) || 0,
            },
            shortBreak: {
                h: parseInt(localSettings.shortBreak.h) || 0,
                m: parseInt(localSettings.shortBreak.m) || 0,
                s: parseInt(localSettings.shortBreak.s) || 0,
            },
            longBreak: {
                h: parseInt(localSettings.longBreak.h) || 0,
                m: parseInt(localSettings.longBreak.m) || 0,
                s: parseInt(localSettings.longBreak.s) || 0,
            },
        };
        onSave(settingsAsNumbers);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-lg p-6 w-full max-w-md text-black relative" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                    <h2 className="text-xl font-bold">Settings</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-black"><IoClose size={24} /></button>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold text-sm">TIME (H : M : S)</h3>
                    <TimeInput label="Pomodoro" value={localSettings.pomodoro} onChange={(unit, value) => handleInputChange('pomodoro', unit, value)} />
                    <TimeInput label="Short Break" value={localSettings.shortBreak} onChange={(unit, value) => handleInputChange('shortBreak', unit, value)} />
                    <TimeInput label="Long Break" value={localSettings.longBreak} onChange={(unit, value) => handleInputChange('longBreak', unit, value)} />
                </div>

                <div className="flex justify-end mt-6 border-t pt-4">
                   
                    <button onClick={handleSave} className="bg-gray-800 text-white px-8 py-3 rounded-md hover:bg-gray-700">OK</button>
                </div>
            </div>
        </div>
    );
}