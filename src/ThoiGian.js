import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./ThoiGian.css";

const ThoiGian = () => {
    const navigate = useNavigate();
    const [startTime, setStartTime] = useState({ hour: 11, minute: 0 });
    const [endTime, setEndTime] = useState({ hour: 12, minute: 0 });
    const [countdown, setCountdown] = useState("");
    const [isCounting, setIsCounting] = useState(false);

    const handleStart = () => {
        navigate('/trang-chu');
    };

    const handleSave = () => {
        setIsCounting(true);
    };

    const handleCancel = () => {
        setIsCounting(false);
        setCountdown("");
    };

    const formatTime = (time) => {
        return time < 10 ? `0${time}` : time;
    };

    useEffect(() => {
        if (!isCounting) return;

        const interval = setInterval(() => {
            const now = new Date();
            const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startTime.hour, startTime.minute, 0);
            const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endTime.hour, endTime.minute, 0);
            let diff;

            if (now < start) {
                // Đếm ngược đến thời gian bắt đầu
                diff = start - now;
            } else if (now < end) {
                // Đếm ngược trong khoảng thời gian đã chọn
                diff = end - now;
            } else {
                // Đã hết giờ, dừng đếm ngược
                clearInterval(interval);
                setIsCounting(false);
                setCountdown("00:00");
                return;
            }

            const totalSeconds = Math.floor(diff / 1000);
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            setCountdown(`${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`);

        }, 1000);

        return () => clearInterval(interval);
    }, [isCounting, startTime, endTime]);

    // Code cho vh
    useEffect(() => {
        const setVh = () => {
            document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
        };
        setVh();
        window.addEventListener("resize", setVh);
        return () => window.removeEventListener("resize", setVh);
    }, []);


    return (
        <div className="thoigian-container">
            <h2 className="title">THIẾT LẬP THỜI GIAN</h2>

            <div className="time-display">
                <span>{isCounting ? countdown : `${formatTime(startTime.hour)}:${formatTime(startTime.minute)}`}</span>
            </div>

            <div className="time-row">
                <span className="label">Bắt đầu</span>
                <div className="input-group">
                    <input 
                        type="number" 
                        className="circle" 
                        value={formatTime(startTime.hour)} 
                        onChange={(e) => setStartTime({ ...startTime, hour: parseInt(e.target.value) || 0 })} 
                        min="0" max="23" 
                    />
                    <span className="colon">:</span>
                    <input 
                        type="number" 
                        className="circle" 
                        value={formatTime(startTime.minute)} 
                        onChange={(e) => setStartTime({ ...startTime, minute: parseInt(e.target.value) || 0 })} 
                        min="0" max="59" 
                    />
                </div>
            </div>

            <div className="time-row">
                <span className="label">Kết thúc</span>
                <div className="input-group">
                    <input 
                        type="number" 
                        className="circle" 
                        value={formatTime(endTime.hour)} 
                        onChange={(e) => setEndTime({ ...endTime, hour: parseInt(e.target.value) || 0 })} 
                        min="0" max="23" 
                    />
                    <span className="colon">:</span>
                    <input 
                        type="number" 
                        className="circle" 
                        value={formatTime(endTime.minute)} 
                        onChange={(e) => setEndTime({ ...endTime, minute: parseInt(e.target.value) || 0 })} 
                        min="0" max="59" 
                    />
                </div>
            </div>

            <div className="time-row">
                <span className="label">Chế độ</span>
                <div className="mode-selector">
                    <button className="arrow-btn">◀</button>
                    <div className="mode-box">
                        <img src="" alt="animal" />
                    </div>
                    <button className="arrow-btn">▶</button>
                </div>
            </div>

            <div className="btn-group">
                <button className="btn-save" onClick={handleSave}>Lưu</button>
                <button className="btn-cancel" onClick={handleCancel}>Hủy</button>
                <button className="btn-back" onClick={handleStart}>Quay lại</button>
            </div>
        </div>
    );
};

export default ThoiGian;