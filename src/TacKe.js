import { useEffect } from "react";
import "./TacKe.css";

const TacKe = () => {
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
    <div className="tacke-container">
      <h2 className="title">CÀI ĐẶT</h2>

      {/* Hình tắc kè */}
      <img src="" alt="Tắc kè" className="animal-img top-img" />

      <div className="form-group">
        <label>Tên bé :</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label>Tuổi :</label>
        <input type="number" />
      </div>
      <div className="form-group">
        <label>Giới tính :</label>
        <input type="text" />
      </div>

      <div className="form-group">
        <label>Âm lượng</label>
        <input type="range" min="0" max="100" />
      </div>

      {/* Hình con lười */}
      <img src="" alt="Con lười" className="animal-img bottom-img" />
    </div>
  );
};

export default TacKe;
