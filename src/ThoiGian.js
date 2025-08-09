import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./ThoiGian.css";

const ThoiGian = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/trang-chu');
  };


  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  return (
    <div className="thoigian-container">
      <h2 className="title">THIẾT LẬP THỜI GIAN</h2>

      <div className="time-display">
        <span>11:00</span>
      </div>

      <div className="time-row">
        <span className="label">Bắt đầu</span>
        <div className="input-group">
          <div className="circle">--</div>
          <span className="colon">:</span>
          <div className="circle">--</div>
        </div>
      </div>

      <div className="time-row">
        <span className="label">Kết thúc</span>
        <div className="input-group">
          <div className="circle">--</div>
          <span className="colon">:</span>
          <div className="circle">--</div>
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
        <button className="btn-save" onClick={handleStart}>Lưu</button>
        <button className="btn-cancel" onClick={handleStart}>Hủy</button>
      </div>
    </div>
  );
};

export default ThoiGian;
