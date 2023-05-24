import React, { useState, useEffect } from 'react';
import GithubIcon from './GithubIcon';
import LinkedinIcon from './LinkedinIcon';
import YoutubeIcon from './YoutubeIcon';

const PomodoroTimer = () => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [showReset, setShowReset] = useState(false);
    const [timeExpired, setTimeExpired] = useState(false);
    const [selectedTime, setSelectedTime] = useState(25);

    useEffect(() => {
        let interval = null;

        if (isRunning) {
            interval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds((prevSeconds) => prevSeconds - 1);
                } else if (minutes > 0 || seconds > 0) {
                    setMinutes((prevMinutes) => prevMinutes - 1);
                    setSeconds(59);
                } else {
                    clearInterval(interval);
                    // Timer has reached 0
                    // You can add a sound or handle the end of the timer here
                    setTimeExpired(true);
                }
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isRunning, selectedTime, minutes, seconds]);



    const startTimer = () => {
        setIsRunning(true);
        setShowReset(true);
    };

    const pauseTimer = () => {
        setIsRunning(false);
        setShowReset(true);
    };

    const resetTimer = () => {
        setMinutes(selectedTime);
        setSeconds(0);
        setIsRunning(false);
        setShowReset(false);
    };

    const handleTimeChange = (event) => {
        const selectedMinutes = parseInt(event.target.value);
        setSelectedTime(selectedMinutes);
    };

    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                <div className="flex flex-col items-center justify-center h-screen bg-background1">
                
                    <div className="bg-white bg-opacity-5  rounded-lg shadow-lg p-8 min-h-[50%] min-w-[30%] flex align-middle flex-col justify-center backdrop-filter backdrop-blur-lg backdrop-saturate-150">
                        <h1 className="text-6xl text-center text-white mb-4 font-semibold">⏰ Timer</h1>
                        <div className="flex items-center justify-center mb-8">
                            <select
                                className="text-6xl font-bold  border-none outline-none appearance-none"
                                value={selectedTime}
                                onChange={handleTimeChange}
                            >
                                <option value={10}>10:00</option>
                                <option value={25}>25:00</option>
                                <option value={40}>40:00</option>
                                <option value={55}>55:00</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-center space-x-4">
                            {!isRunning ? (
                                <button
                                    className="py-2 px-4 rounded bg-gray-300 hover:bg-gray-400 text-white shadow-lg bg-opacity-40 backdrop-filter backdrop-blur-lg backdrop-saturate-150"
                                    onClick={startTimer}
                                >
                                    Start
                                </button>

                            ) : (
                                <button
                                    className="py-2 px-4 rounded bg-gray-300 hover:bg-gray-400 text-white shadow-lg bg-opacity-40 backdrop-filter backdrop-blur-lg backdrop-saturate-150"
                                    onClick={pauseTimer}
                                >
                                    Pause
                                </button>
                            )}
                            {showReset && (
                                <button
                                    className="py-2 px-4 rounded bg-gray-300 hover:bg-gray-400 text-white shadow-lg bg-opacity-40 backdrop-filter backdrop-blur-lg backdrop-saturate-150"
                                    onClick={resetTimer}
                                >
                                    Reset
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <footer className="bg-white bg-opacity-10 backdrop-blur-lg py-8 absolute bottom-0 w-full">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="text-white text-center md:text-left mb-4 md:mb-0 flex items-center justify-center">
                            <span className="text-md font-normal">developed with 💜 by codewithxavi </span>
                            &nbsp;
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-brand-react"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="1"
                                stroke="#ffffff"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M6.306 8.711c-2.602 .723 -4.306 1.926 -4.306 3.289c0 2.21 4.477 4 10 4c.773 0 1.526 -.035 2.248 -.102" />
                                <path d="M17.692 15.289c2.603 -.722 4.308 -1.926 4.308 -3.289c0 -2.21 -4.477 -4 -10 -4c-.773 0 -1.526 .035 -2.25 .102" />
                                <path d="M6.305 15.287c-.676 2.615 -.485 4.693 .695 5.373c1.913 1.105 5.703 -1.877 8.464 -6.66c.387 -.67 .733 -1.339 1.036 -2" />
                                <path d="M17.694 8.716c.677 -2.616 .487 -4.696 -.694 -5.376c-1.913 -1.105 -5.703 1.877 -8.464 6.66c-.387 .67 -.733 1.34 -1.037 2" />
                                <path d="M12 5.424c-1.925 -1.892 -3.82 -2.766 -5 -2.084c-1.913 1.104 -1.226 5.877 1.536 10.66c.386 .67 .793 1.304 1.212 1.896" />
                                <path d="M12 18.574c1.926 1.893 3.821 2.768 5 2.086c1.913 -1.104 1.226 -5.877 -1.536 -10.66c-.375 -.65 -.78 -1.283 -1.212 -1.897" />
                                <path d="M11.5 12.866a1 1 0 1 0 1 -1.732a1 1 0 0 0 -1 1.732z" />
                            </svg>
                            &nbsp;
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-brand-tailwind"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="1"
                                stroke="#ffffff"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M11.667 6c-2.49 0 -4.044 1.222 -4.667 3.667c.933 -1.223 2.023 -1.68 3.267 -1.375c.71 .174 1.217 .68 1.778 1.24c.916 .912 2 1.968 4.288 1.968c2.49 0 4.044 -1.222 4.667 -3.667c-.933 1.223 -2.023 1.68 -3.267 1.375c-.71 -.174 -1.217 -.68 -1.778 -1.24c-.916 -.912 -1.975 -1.968 -4.288 -1.968zm-4 6.5c-2.49 0 -4.044 1.222 -4.667 3.667c.933 -1.223 2.023 -1.68 3.267 -1.375c.71 .174 1.217 .68 1.778 1.24c.916 .912 1.975 1.968 4.288 1.968c2.49 0 4.044 -1.222 4.667 -3.667c-.933 1.223 -2.023 1.68 -3.267 1.375c-.71 -.174 -1.217 -.68 -1.778 -1.24c-.916 -.912 -1.975 -1.968 -4.288 -1.968z" />
                            </svg>
                            &nbsp;
                            &copy; {new Date().getFullYear()}
                        </div>
                        <div className="flex items-center space-x-4">
                            <a
                                href="https://github.com/codewithxavi"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-gray-300 transition-colors duration-300"
                            >
                                <GithubIcon />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/codewithxavi/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-gray-300 transition-colors duration-300"
                            >
                                <LinkedinIcon />
                            </a>
                            <a
                                href="https://www.youtube.com/@codewithxavi"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-gray-300 transition-colors duration-300"
                            >
                                <YoutubeIcon />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PomodoroTimer;
