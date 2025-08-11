import { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./setting.css";

const Monkey = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(50);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Play error:", err));
    }
  };

  const handlePauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    const percent =
      ((newValue - e.target.min) / (e.target.max - e.target.min)) * 100 + "%";
    e.target.style.setProperty("--percent", percent);

    if (audioRef.current) {
      audioRef.current.volume = newValue / 100;
    }
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
    <div className="setting-container">
      <div className="form-header">
        <span>CÀI ĐẶT</span>
        <img src="/images/monkey.png" alt="Tắc kè" width={'120px'} />
      </div>

      <div className="form-group">
        <label>Tên bé:</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label>Tuổi:</label>
        <input type="number" />
      </div>
      <div className="form-group">
        <label>Giới tính:</label>
        <input type="text" />
      </div>

      <div className="form-group">
        <label>Âm lượng:</label>
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={handleChange}
        />
      </div>

      <div className="form-audio">
        <button onClick={handlePauseAudio} disabled={!isPlaying} className="btn btn-danger">Dừng phát</button>
        <button onClick={handlePlayAudio} disabled={isPlaying} className="btn btn-success">Bắt đầu phát</button>
      </div>

      <div className="form-bottom">
        <img src="/images/con-luoi.png" alt="Con lười" className="bottom-img" />
        <button
          className="button-back-caidat"
          onClick={() => navigate('/trang-chu')}
        >
          Quay lại
        </button>
      </div>

      <audio ref={audioRef} src="/audio/monkey.mp3" loop />
    </div>
  );
};

export default Monkey;
