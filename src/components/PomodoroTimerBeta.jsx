import React, { useState, useEffect } from 'react'
import GithubIcon from './GithubIcon'
import LinkedinIcon from './LinkedinIcon'
import YoutubeIcon from './YoutubeIcon'

const PomodoroTimerBeta = () => {

    const [time, setTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    const [canStart, setCanStart] = useState(false);
    const [countdown, setCountdown] = useState(null);

    const handleStart = () => {
        // Validate hours
        if (time.hours < 0) {
            alert("Please enter a valid value for hours");
            return;
        }
        // Validate minutes
        if (time.minutes < 0 || time.minutes > 59 || isNaN(time.minutes)) {
            alert("Please enter a valid value for minutes");
            return;
        }
        // Validate seconds
        if (time.seconds < 0 || time.seconds > 59 || isNaN(time.seconds)) {
            alert("Please enter a valid value for seconds");
            return;
        }

        // Validate 0
        if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
            alert("Error: All values are 0. Please enter a valid time");
            return;
        }

        const totalSeconds = time.hours * 3600 + time.minutes * 60 + time.seconds;
        setCountdown(totalSeconds);
        setCanStart(true);
    };

    const resetInputValues = () => {
        // Reset input values to 0
        setTime({
            hours: 0,
            minutes: 0,
            seconds: 0
        });
    };

    useEffect(() => {
        const showNotification = () => {
            new Notification("Time is up!", {
                body: "The countdown has finished.",
                icon: "path_to_notification_icon.png",
            });
        };

        if (canStart && countdown > 0) {
            const interval = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);

            return () => clearInterval(interval);
        } else if (canStart && countdown === 0) {
            // Countdown has reached 0
            setCanStart(false);

            if ("Notification" in window) {
                if (Notification.permission === "granted") {
                    showNotification();
                    setTimeout(() => {
                        resetInputValues(); 
                        alert("Time is up!");
                    }, 1000);
                } else if (Notification.permission !== "denied") {
                    Notification.requestPermission().then((permission) => {
                        if (permission === "granted") {
                            showNotification();
                            setTimeout(() => {
                                resetInputValues(); 
                                alert("Time is up!");
                            }, 1000);
                        }
                    });
                }
            } else {
                resetInputValues();
                alert("Time is up!");
            }
        }
    }, [canStart, countdown, resetInputValues]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTime((prevState) => ({
            ...prevState,
            [name]: parseInt(value, 10),
        }));
    }

    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    };

    return (
        <div className='flex flex-col min-h-screen'>
            <div className='flex-grow'>
                <div className='flex flex-col items-center justify-center h-screen bg-background1'>
                    <h1 className="text-6xl font-semibold w-fit h-fit text-center text-white pb-5 group overflow-hidden bottom-5 relative">
                        Timer
                        <span className="group-hover:translate-y-20 inline-block transition-transform animate-pulse pt-5">⏰</span>
                    </h1>
                    <div className="bg-white rounded-lg shadow-lg p-8 min-h-[50%] min-w-[30%] flex align-middle flex-col justify-center bg-opacity-5 backdrop-filter backdrop-blur-lg backdrop-saturate-150 neumorphism2">
                        <div className="flex items-center justify-center mb- text-white flex-col ">
                            {!canStart && <h2 className='mb-10 text-2xl'>Choose your pomodoro time:</h2>}

                            <>
                                {!canStart ? (
                                    <div>
                                        <label className="flex items-center mb-2">
                                            <span className="mr-2 text-xl">Hours</span>
                                            <input
                                                type="number"
                                                name="hours"
                                                value={time.hours}
                                                onChange={handleChange}
                                                className="w-20 text-center focus:outline-none ml-auto text-background1"
                                            />
                                        </label>
                                        <label className="flex items-center mb-2">
                                            <span className="mr-2 text-xl">Minutes</span>
                                            <input
                                                type="number"
                                                name="minutes"
                                                value={time.minutes}
                                                onChange={handleChange}
                                                className="w-20 text-center focus:outline-none ml-auto text-background1"
                                            />
                                        </label>
                                        <label className="flex items-center mb-2">
                                            <span className="mr-2 text-xl">Seconds</span>
                                            <input
                                                type="number"
                                                name="seconds"
                                                value={time.seconds}
                                                onChange={handleChange}
                                                className="w-20 text-center focus:outline-none ml-auto text-background1"
                                            />
                                        </label>
                                        <button
                                            className="text-2xl w-full mt-10 text-center rounded-lg bg-gray-100 border p-2 shadow-md hover:shadow-lg focus:outline-none focus:ring focus:border-bermuda"
                                            onClick={handleStart}
                                        >
                                            Start
                                        </button>
                                    </div>

                                ) : (
                                    <div>
                                        {/* Aquí puedes mostrar el conteo regresivo */}
                                        <h3 className='text-2xl'>Countdown... {formatTime(countdown)}</h3>
                                    </div>
                                )}
                            </>

                        </div>
                    </div>
                </div>
            </div>
            <footer className='absolute bottom-0 w-full py-5 bg-white bg-opacity-10 backdrop-blur-lg shadow-lg'>
                <div className=' px-4 mx-auto container'> 
                    <div className='flex flex-col items-center justify-center md:flex-row'>
                        <div className='flex items-center justify-center mb-4 text-center text-white md:text-left md:mb-0 md:gap-x-20'>
                            <span className='font-normal text-md'>
                                developed with 💜 by codewithxavi{' '}  <span className='text-white'> &copy; {new Date().getFullYear()}</span>
                            </span>
                            &nbsp;
 
                        </div>
                        <div className='flex items-center space-x-4'>
                            <a
                                href='https://github.com/codewithxavi'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-white transition-colors duration-300 hover:text-gray-300'
                                aria-label='Github'
                            >
                                <GithubIcon />
                            </a>
                            <a
                                href='https://www.linkedin.com/in/codewithxavi/'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-white transition-colors duration-300 hover:text-gray-300'
                                aria-label='Linkedin'
                            >
                                <LinkedinIcon />
                            </a>
                            <a
                                href='https://www.youtube.com/@codewithxavi'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-white transition-colors duration-300 hover:text-gray-300'
                                aria-label='youtube'
                            >
                                <YoutubeIcon />
                            </a>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='icon icon-tabler icon-tabler-brand-react'
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                strokeWidth='1'
                                stroke='#ffffff'
                                fill='none'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            >
                                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                                <path d='M6.306 8.711c-2.602 .723 -4.306 1.926 -4.306 3.289c0 2.21 4.477 4 10 4c.773 0 1.526 -.035 2.248 -.102' />
                                <path d='M17.692 15.289c2.603 -.722 4.308 -1.926 4.308 -3.289c0 -2.21 -4.477 -4 -10 -4c-.773 0 -1.526 .035 -2.25 .102' />
                                <path d='M6.305 15.287c-.676 2.615 -.485 4.693 .695 5.373c1.913 1.105 5.703 -1.877 8.464 -6.66c.387 -.67 .733 -1.339 1.036 -2' />
                                <path d='M17.694 8.716c.677 -2.616 .487 -4.696 -.694 -5.376c-1.913 -1.105 -5.703 1.877 -8.464 6.66c-.387 .67 -.733 1.34 -1.037 2' />
                                <path d='M12 5.424c-1.925 -1.892 -3.82 -2.766 -5 -2.084c-1.913 1.104 -1.226 5.877 1.536 10.66c.386 .67 .793 1.304 1.212 1.896' />
                                <path d='M12 18.574c1.926 1.893 3.821 2.768 5 2.086c1.913 -1.104 1.226 -5.877 -1.536 -10.66c-.375 -.65 -.78 -1.283 -1.212 -1.897' />
                                <path d='M11.5 12.866a1 1 0 1 0 1 -1.732a1 1 0 0 0 -1 1.732z' />
                            </svg>

                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='icon icon-tabler icon-tabler-brand-tailwind'
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                strokeWidth='1'
                                stroke='#ffffff'
                                fill='none'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            >
                                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                                <path d='M11.667 6c-2.49 0 -4.044 1.222 -4.667 3.667c.933 -1.223 2.023 -1.68 3.267 -1.375c.71 .174 1.217 .68 1.778 1.24c.916 .912 2 1.968 4.288 1.968c2.49 0 4.044 -1.222 4.667 -3.667c-.933 1.223 -2.023 1.68 -3.267 1.375c-.71 -.174 -1.217 -.68 -1.778 -1.24c-.916 -.912 -1.975 -1.968 -4.288 -1.968zm-4 6.5c-2.49 0 -4.044 1.222 -4.667 3.667c.933 -1.223 2.023 -1.68 3.267 -1.375c.71 .174 1.217 .68 1.778 1.24c.916 .912 1.975 1.968 4.288 1.968c2.49 0 4.044 -1.222 4.667 -3.667c-.933 1.223 -2.023 1.68 -3.267 1.375c-.71 -.174 -1.217 -.68 -1.778 -1.24c-.916 -.912 -1.975 -1.968 -4.288 -1.968z' />
                            </svg>

                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default PomodoroTimerBeta