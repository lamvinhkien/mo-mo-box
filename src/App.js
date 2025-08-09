import './App.css';
import BatDau from './BatDau';
import TrangChu from './TrangChu';
import ThoiGian from './ThoiGian';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<BatDau />} />
          <Route path="/trang-chu" element={<TrangChu />} />
          <Route path="/thoi-gian" element={<ThoiGian />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
