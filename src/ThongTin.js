import { useEffect } from "react";
import "./ThongTin.css";
import { useNavigate } from 'react-router-dom';

const ThongTin = () => {
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
    <div className="thongtin-container">
      <div className="thongtin-item">
        <img src="" alt="Kangaroo" className="animal-icon" />
        <p>
          Chế độ này thì trẻ mà đang ngủ mà có dấu hiệu thức dậy thì hộp sẽ phát
          ra âm thanh để báo cho phụ huynh
        </p>
      </div>

      <div className="thongtin-item">
        <img src="" alt="Rooster" className="animal-icon" />
        <p>Chế độ này giúp thông báo cho phụ huynh khi tới giờ ăn</p>
      </div>

      <div className="thongtin-item">
        <img src="" alt="Chameleon" className="animal-icon" />
        <p>
          Chế độ này giúp theo dõi nhiệt độ trong phòng. Nếu phòng quá lạnh hoặc
          nóng thì sẽ phát thông báo
        </p>
      </div>

      <div className="thongtin-item">
        <img src="" alt="Monkey" className="animal-icon" />
        <p>
          Chế độ này sẽ phát ra âm thanh vui nhộn kích thích trẻ vận động vui
          chơi
        </p>
      </div>

      <div className="thongtin-item">
        <img src="" alt="Parrot" className="animal-icon" />
        <p>
          Chế độ này sẽ giúp ru ngủ bé bằng cách phát ra tiếng nhạc hoặc kể lại
          các câu chuyện có sẵn
        </p>
      </div>

      <button className="back-button" onClick={() => navigate('/trang-chu')}>BACK</button>
    </div>
  );
};

export default ThongTin;