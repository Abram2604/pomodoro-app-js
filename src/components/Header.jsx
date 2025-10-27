// src/components/Header.jsx
"use client";

import { VscGraph } from "react-icons/vsc";
import { IoSettingsOutline } from "react-icons/io5";

export default function Header({ onSettingsClick, onReportClick }) {
    return (
        <header className="relative z-10 flex items-center justify-between p-4 max-w-3xl mx-auto w-full">
            <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m15.71 8.29-3.42 3.42"></path></svg>
                <h1 className="text-white text-xl font-bold">Pomofocus</h1>
            </div>
            <nav className="flex items-center gap-2">
                 <button 
          onClick={playSound}
          className="flex items-center gap-2 bg-white/10 p-2 rounded-md text-sm hover:bg-white/20"
        >
          <FiVolume2 /> Test Audio
        </button>
                <button
                    onClick={onReportClick}
                    className="flex items-center gap-2 bg-white/10 p-2 rounded-md text-sm hover:bg-white/20"
                >
                    <VscGraph /> Report
                </button>

                <button
                    onClick={onSettingsClick}
                    className="flex items-center gap-2 bg-white/10 p-2 rounded-md text-sm hover:bg-white/20"
                >
                    <IoSettingsOutline /> Setting
                </button>
            </nav>
        </header>
    );
}