import React, { useState, useEffect } from 'react'
import GithubIcon from './GithubIcon'
import LinkedinIcon from './LinkedinIcon'
import YoutubeIcon from './YoutubeIcon'


const PomodoroTimer = () => {
    const [minutes, setMinutes] = useState(25)
    const [seconds, setSeconds] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [showReset, setShowReset] = useState(false)
    const [timeExpired, setTimeExpired] = useState(false)

    // useEffect(() => {
    //     if (Notification.permission !== 'granted') {
    //         Notification.requestPermission().then(permission => {
    //             if (permission === 'granted') {
    //                 console.log('Notification permission granted!');
    //             }
    //         });
    //     }
    // }, []);

    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(prevSeconds => prevSeconds - 1);
                } else if (minutes > 0) {
                    setMinutes(prevMinutes => prevMinutes - 1);
                    setSeconds(59);
                } else {
                    clearInterval(interval);
                    setTimeExpired(true);
                    showNotification();
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isRunning, minutes, seconds]);

    const showNotification = () => {
        if (Notification.permission === 'granted') {
            new Notification('Timer Expired', {
                body: 'The timer has reached 0.',
            });
        }
    };

    const startTimer = () => {
        setIsRunning(true)
        setShowReset(true)
    }

    const pauseTimer = () => {
        setIsRunning(false)
        setShowReset(true)

    }

    const resetTimer = () => {
        setSeconds(0)
        setIsRunning(false)
        setShowReset(false)
    }

    const handleTimeChange = event => {
        const selectedMinutes = parseInt(event.target.value)
        setMinutes(selectedMinutes)
    }

    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const clockEmojiStyle = isHovered ? 'translate-y-2' : 'translate-y-0';


    return (
        <div className='flex flex-col min-h-screen'>
            <div className='flex-grow'>
                <div className='flex flex-col items-center justify-center h-screen bg-background1'>
                    <h1 class="text-6xl font-semibold w-fit h-fit text-center text-white pb-1 group overflow-hidden bottom-5 relative">
                        Timer
                        <span class="group-hover:translate-y-20 inline-block transition-transform animate-pulse pt-5">⏰</span>
                    </h1>
                    <div className="bg-white rounded-lg shadow-lg p-8 min-h-[50%] min-w-[30%] flex align-middle flex-col justify-center bg-opacity-5 backdrop-filter backdrop-blur-lg backdrop-saturate-150 neumorphism2">
                        <div className="flex items-center justify-center mb-8">
                            {isRunning ? (
                                <p className="neumorphism text-8xl font-bold text-white border-none outline-none appearance-none">{formattedTime}</p>
                            ) : (
                                <select
                                    className=" neumorphism p-2 text-8xl font-bold text-white border-none rounded-lg shadow-inner outline-none appearance-none bg-background1 backdrop-filter backdrop-blur-lg backdrop-saturate-150"
                                    value={minutes}
                                    onChange={handleTimeChange}
                                >
                                    <option value={10}>10:00</option>
                                    <option value={25}>25:00</option>
                                    <option value={40}>40:00</option>
                                    <option value={55}>55:00</option>
                                </select>
                            )}
                        </div>
                        <div className="flex items-center justify-center space-x-4">
                            {!isRunning ? (
                                <button
                                    className="neumorphism text-3xl px-4 py-2 text-white bg-gray-300 rounded shadow-lg hover:bg-gray-400 bg-opacity-40 backdrop-filter backdrop-blur-lg backdrop-saturate-150"
                                    onClick={startTimer}
                                >
                                    Start
                                </button>
                            ) : (
                                <button
                                    className="neumorphism text-3xl px-4 py-2 text-white bg-gray-300 rounded shadow-lg hover:bg-gray-400 bg-opacity-40 backdrop-filter backdrop-blur-lg backdrop-saturate-150"
                                    onClick={pauseTimer}
                                >
                                    Pause
                                </button>
                            )}
                            {showReset && (
                                <button
                                    className="neumorphism text-3xl px-4 py-2 text-white bg-gray-300 rounded shadow-lg hover:bg-gray-400 bg-opacity-40 backdrop-filter backdrop-blur-lg backdrop-saturate-150"
                                    onClick={resetTimer}
                                >
                                    Reset
                                </button>
                            )}
                        </div>
                    </div>


                </div>
            </div>
            <footer className='absolute bottom-0 w-full py-5 bg-white bg-opacity-10 backdrop-blur-lg b shadow-lg'>
                <div className='container px-4 mx-auto'>
                    <div className='flex flex-col items-center justify-between md:flex-row'>
                        <div className='flex items-center justify-center mb-4 text-center text-white md:text-left md:mb-0'>
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

export default PomodoroTimer