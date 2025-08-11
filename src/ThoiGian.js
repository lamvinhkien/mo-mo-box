import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import "./ThoiGian.css";

const ThoiGian = () => {
    const navigate = useNavigate();
    const [startTime, setStartTime] = useState({ hour: 0, minute: 0, second: 0 });
    const [endTime, setEndTime] = useState({ hour: 0, minute: 0, second: 0 });
    const [timeLeft, setTimeLeft] = useState(0);
    const [isCounting, setIsCounting] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const timerRef = useRef(null);

    const audioRef = useRef(null);

    const [countdownStarted, setCountdownStarted] = useState(false);
    const [hasCountdownFinished, setHasCountdownFinished] = useState(false);

    const modes = [
        { src: "/images/kangaroo.png", alt: "kangaroo", audioPath: '/audio/kangaroo.mp3' },
        { src: "/images/chicken.png", alt: "chicken", audioPath: '/audio/chicken.mp3' },
        { src: "/images/gecko.png", alt: "gecko", audioPath: '/audio/gecko.mp3' },
        { src: "/images/monkey.png", alt: "monkey", audioPath: '/audio/monkey.mp3' },
        { src: "/images/parrot.png", alt: "parrot", audioPath: '/audio/parrot.mp3' },
    ];
    const [currentModeIndex, setCurrentModeIndex] = useState(0);

    const handlePrevMode = () => setCurrentModeIndex(prev => (prev - 1 + modes.length) % modes.length);
    const handleNextMode = () => setCurrentModeIndex(prev => (prev + 1) % modes.length);
    const handleStart = () => navigate('/trang-chu');

    const formatTime = (num) => num.toString().padStart(2, "0");

    const handleSave = () => {
        const sh = Number(startTime.hour);
        const sm = Number(startTime.minute);
        const ss = Number(startTime.second);
        const eh = Number(endTime.hour);
        const em = Number(endTime.minute);
        const es = Number(endTime.second);

        if (isNaN(sh) || sh < 0 || sh > 23) return alert("Giờ bắt đầu phải nằm trong khoảng 0 - 23.");
        if (isNaN(eh) || eh < 0 || eh > 23) return alert("Giờ kết thúc phải nằm trong khoảng 0 - 23.");
        if (isNaN(sm) || sm < 0 || sm > 59) return alert("Phút bắt đầu phải nằm trong khoảng 0 - 59.");
        if (isNaN(em) || em < 0 || em > 59) return alert("Phút kết thúc phải nằm trong khoảng 0 - 59.");
        if (isNaN(ss) || ss < 0 || ss > 59) return alert("Giây bắt đầu phải nằm trong khoảng 0 - 59.");
        if (isNaN(es) || es < 0 || es > 59) return alert("Giây kết thúc phải nằm trong khoảng 0 - 59.");

        const startSeconds = sh * 3600 + sm * 60 + ss;
        const endSeconds = eh * 3600 + em * 60 + es;
        let diffSeconds = endSeconds - startSeconds;
        if (diffSeconds < 0) diffSeconds += 24 * 3600;

        if (diffSeconds <= 0) return alert("Vui lòng chỉnh thời gian.");

        if (audioRef.current) {
            try {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                audioRef.current.src = "";
            } catch { }
        }

        setTimeLeft(diffSeconds);
        setIsCounting(true);
        setCountdownStarted(true);
        setHasCountdownFinished(false);
    };

    const handleCancel = () => {
        setIsCounting(false);
        setTimeLeft(0);
        setCountdownStarted(false);
        setHasCountdownFinished(false);
        clearInterval(timerRef.current);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current.src = "";
        }
    };

    useEffect(() => {
        const clockInterval = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(clockInterval);
    }, []);

    useEffect(() => {
        if (!isCounting) return;

        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    setIsCounting(false);
                    setHasCountdownFinished(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [isCounting]);

    useEffect(() => {
        if (!hasCountdownFinished || !countdownStarted) return;

        const selectedAudio = modes[currentModeIndex].audioPath;
        if (!selectedAudio) return;

        if (audioRef.current) {
            audioRef.current.src = selectedAudio;
            audioRef.current.loop = true;
            audioRef.current.play().catch(err => {
                console.warn("Không thể phát audio:", err);
            });
        }
    }, [hasCountdownFinished, currentModeIndex, countdownStarted]);

    const countdownDisplay = () => {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    };

    const onChangeHour = (setter, val) => setter(prev => ({ ...prev, hour: parseInt(val) || 0 }));
    const onChangeMinute = (setter, val) => setter(prev => ({ ...prev, minute: parseInt(val) || 0 }));
    const onChangeSecond = (setter, val) => setter(prev => ({ ...prev, second: parseInt(val) || 0 }));

    return (
        <div className="thoigian-container">
            <h2 className="title">THIẾT LẬP THỜI GIAN</h2>

            <div className="time-display">
                <span>
                    {`${formatTime(currentTime.getHours())}:${formatTime(currentTime.getMinutes())}:${formatTime(currentTime.getSeconds())}`}
                </span>
            </div>

            <div className="time-row mb-4">
                <span className="label">Bắt đầu</span>
                <div className="input-group">
                    <input type="number" className="circle" value={formatTime(startTime.hour)}
                        onChange={(e) => onChangeHour(setStartTime, e.target.value)} min="0" max="23" />
                    <span className="colon">:</span>
                    <input type="number" className="circle" value={formatTime(startTime.minute)}
                        onChange={(e) => onChangeMinute(setStartTime, e.target.value)} min="0" max="59" />
                    <span className="colon">:</span>
                    <input type="number" className="circle" value={formatTime(startTime.second)}
                        onChange={(e) => onChangeSecond(setStartTime, e.target.value)} min="0" max="59" />
                </div>
            </div>

            <div className="time-row mb-4">
                <span className="label">Kết thúc</span>
                <div className="input-group">
                    <input type="number" className="circle" value={formatTime(endTime.hour)}
                        onChange={(e) => onChangeHour(setEndTime, e.target.value)} min="0" max="23" />
                    <span className="colon">:</span>
                    <input type="number" className="circle" value={formatTime(endTime.minute)}
                        onChange={(e) => onChangeMinute(setEndTime, e.target.value)} min="0" max="59" />
                    <span className="colon">:</span>
                    <input type="number" className="circle" value={formatTime(endTime.second)}
                        onChange={(e) => onChangeSecond(setEndTime, e.target.value)} min="0" max="59" />
                </div>
            </div>

            <div className="time-row mb-4">
                <span className="label">Chế độ</span>
                <div className="mode-selector">
                    <button className="arrow-btn" onClick={handlePrevMode}>◀</button>
                    <div className="mode-box">
                        <img src={modes[currentModeIndex].src} alt={modes[currentModeIndex].alt}
                            style={{ width: '50px', height: '50px' }} />
                    </div>
                    <button className="arrow-btn" onClick={handleNextMode}>▶</button>
                </div>
            </div>

            <div className="time-row">
                <span className="label">Đếm ngược</span>
                <div className="time-countdown">
                    {countdownDisplay()}
                </div>
            </div>

            <div className="btn-group">
                <button className="btn-save" onClick={handleSave}>Lưu</button>
                <button className="btn-cancel" onClick={handleCancel}>Hủy</button>
                <button className="btn-back" onClick={handleStart}>Quay lại</button>
            </div>

            <audio ref={audioRef} />
        </div>
    );
};

export default ThoiGian;
