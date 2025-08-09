import "./BatDau.css";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

const BatDau = () => {
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
    <div className="start-container d-flex flex-column align-items-center justify-content-center">
      {/* Blob */}
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>

      {/* Nội dung */}
      <h1 className="title-text moo-lah-lah-regular">MO MO BOX</h1>
      <button className="btn-start" onClick={handleStart}>Bắt đầu</button>
    </div>
  );
};

export default BatDau;
