import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TrangChu.css";

const TrangChu = () => {
  const navigate = useNavigate();

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
    <div className="trangchu-container">
      {/* Thanh trạng thái */}
      <div className="status-bar">
        <strong>Trạng thái: đang hoạt động</strong>
        <div className="status-icons">
          <button className="icon-btn">🔔</button>
          <button className="icon-btn" onClick={() => navigate('/thong-tin')}>ℹ️</button>
        </div>
      </div>

      {/* Lưới hình ảnh */}
      <div className="animal-grid">
        <div className="animal-card" onClick={() => navigate('/kangaroo')}>
          <img src="/images/kangaroo.png" alt="Kangaroo" />
        </div>
        <div className="animal-card" onClick={() => navigate('/chicken')}>
          <img src="/images/chicken.png" alt="Gà trống" />
        </div>
        <div className="animal-card" onClick={() => navigate('/gecko')}>
          <img src="/images/gecko.png" alt="Tắc kè" />
        </div>
        <div className="animal-card" onClick={() => navigate('/monkey')}>
          <img src="/images/monkey.png" alt="Khỉ" />
        </div>
        <div className="animal-card" onClick={() => navigate('/parrot')}>
          <img src="/images/parrot.png" alt="Vẹt" />
        </div>
      </div>

      {/* Nút Thiết lập thời gian */}
      <div className="bottom-bar text-center">
        <button className="btn-time" onClick={() => navigate('/thoi-gian')}>THIẾT LẬP THỜI GIAN</button>
        <button className="btn-time" onClick={() => navigate('/')}>Quay lại</button>
      </div>
    </div>
  );
};

export default TrangChu;
