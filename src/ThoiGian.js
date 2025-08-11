import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import "./ThoiGian.css";

const ThoiGian = () => {
    const navigate = useNavigate();
    const [startTime, setStartTime] = useState({ hour: 0, minute: 0 });
    const [endTime, setEndTime] = useState({ hour: 0, minute: 0 });
    const [timeLeft, setTimeLeft] = useState(0); // giây còn lại
    const [isCounting, setIsCounting] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const timerRef = useRef(null);

    // Danh sách mode
    const modes = [
        { src: "/images/kangaroo.png", alt: "kangaroo" },
        { src: "/images/chicken.png", alt: "chicken" },
        { src: "/images/gecko.png", alt: "gecko" },
        { src: "/images/monkey.png", alt: "monkey" },
        { src: "/images/parrot.png", alt: "parrot" },
    ];
    const [currentModeIndex, setCurrentModeIndex] = useState(0);

    const handlePrevMode = () => setCurrentModeIndex(prev => (prev - 1 + modes.length) % modes.length);
    const handleNextMode = () => setCurrentModeIndex(prev => (prev + 1) % modes.length);
    const handleStart = () => navigate('/trang-chu');

    const formatTime = (num) => num.toString().padStart(2, "0");

    // VALIDATE + start countdown
    const handleSave = () => {
        // Ensure numbers (in case states are strings)
        const sh = Number(startTime.hour);
        const sm = Number(startTime.minute);
        const eh = Number(endTime.hour);
        const em = Number(endTime.minute);

        // Validate hours (the range you requested earlier: 0 - 24)
        if (isNaN(sh) || sh < 0 || sh > 23) {
            alert("Giờ bắt đầu phải nằm trong khoảng 0 - 23.");
            return;
        }
        if (isNaN(eh) || eh < 0 || eh > 23) {
            alert("Giờ kết thúc phải nằm trong khoảng 0 - 23.");
            return;
        }

        // Validate minutes (0 - 59)
        if (isNaN(sm) || sm < 0 || sm > 59) {
            alert("Phút bắt đầu phải nằm trong khoảng 0 - 59.");
            return;
        }
        if (isNaN(em) || em < 0 || em > 59) {
            alert("Phút kết thúc phải nằm trong khoảng 0 - 59.");
            return;
        }

        // Nếu mọi thứ hợp lệ, tính chênh lệch phút
        const startMinutes = sh * 60 + sm;
        const endMinutes = eh * 60 + em;
        let diffMinutes = endMinutes - startMinutes;
        if (diffMinutes < 0) diffMinutes += 24 * 60; // xử lý qua ngày

        setTimeLeft(diffMinutes * 60); // đổi sang giây
        setIsCounting(true);
    };

    const handleCancel = () => {
        setIsCounting(false);
        setTimeLeft(0);
        clearInterval(timerRef.current);
    };

    // cập nhật đồng hồ hiện tại mỗi giây
    useEffect(() => {
        const clockInterval = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(clockInterval);
    }, []);

    // đếm ngược khi isCounting = true
    useEffect(() => {
        if (!isCounting || timeLeft <= 0) return;

        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    setIsCounting(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [isCounting, timeLeft]);

    const countdownDisplay = () => {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    };

    // helper: ensure input values remain numeric and within reasonable display
    const onChangeHour = (setter, val) => {
        const n = parseInt(val, 10);
        if (isNaN(n)) setter(prev => ({ ...prev, hour: 0 }));
        else setter(prev => ({ ...prev, hour: n }));
    };
    const onChangeMinute = (setter, val) => {
        const n = parseInt(val, 10);
        if (isNaN(n)) setter(prev => ({ ...prev, minute: 0 }));
        else setter(prev => ({ ...prev, minute: n }));
    };

    return (
        <div className="thoigian-container">
            <h2 className="title">THIẾT LẬP THỜI GIAN</h2>

            {/* Hiển thị thời gian hiện tại */}
            <div className="time-display">
                <span>
                    {`${formatTime(currentTime.getHours())}:${formatTime(currentTime.getMinutes())}:${formatTime(currentTime.getSeconds())}`}
                </span>
            </div>

            {/* Bắt đầu */}
            <div className="time-row mb-4">
                <span className="label">Bắt đầu</span>
                <div className="input-group">
                    <input
                        type="number"
                        className="circle"
                        value={formatTime(startTime.hour)}
                        onChange={(e) => onChangeHour(setStartTime, e.target.value)}
                        min="0" max="24"
                    />
                    <span className="colon">:</span>
                    <input
                        type="number"
                        className="circle"
                        value={formatTime(startTime.minute)}
                        onChange={(e) => onChangeMinute(setStartTime, e.target.value)}
                        min="0" max="59"
                    />
                </div>
            </div>

            {/* Kết thúc */}
            <div className="time-row mb-4">
                <span className="label">Kết thúc</span>
                <div className="input-group">
                    <input
                        type="number"
                        className="circle"
                        value={formatTime(endTime.hour)}
                        onChange={(e) => onChangeHour(setEndTime, e.target.value)}
                        min="0" max="24"
                    />
                    <span className="colon">:</span>
                    <input
                        type="number"
                        className="circle"
                        value={formatTime(endTime.minute)}
                        onChange={(e) => onChangeMinute(setEndTime, e.target.value)}
                        min="0" max="59"
                    />
                </div>
            </div>

            {/* Chế độ */}
            <div className="time-row mb-4">
                <span className="label">Chế độ</span>
                <div className="mode-selector">
                    <button className="arrow-btn" onClick={handlePrevMode}>◀</button>
                    <div className="mode-box">
                        <img src={modes[currentModeIndex].src} alt={modes[currentModeIndex].alt} style={{ width: '50px', height: '50px' }} />
                    </div>
                    <button className="arrow-btn" onClick={handleNextMode}>▶</button>
                </div>
            </div>

            {/* Đếm ngược */}
            <div className="time-row">
                <span className="label">Đếm ngược</span>
                <div className="time-countdown">
                    {countdownDisplay()}
                </div>
            </div>

            {/* Nút */}
            <div className="btn-group">
                <button className="btn-save" onClick={handleSave}>Lưu</button>
                <button className="btn-cancel" onClick={handleCancel}>Hủy</button>
                <button className="btn-back" onClick={handleStart}>Quay lại</button>
            </div>
        </div>
    );
};

export default ThoiGian;
