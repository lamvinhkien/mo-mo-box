import './App.css';
import BatDau from './BatDau';
import TrangChu from './TrangChu';
import ThoiGian from './ThoiGian';
import Gecko from './Gecko';
import Kangaroo from './Kangaroo';
import Chicken from './Chicken';
import Monkey from './Monkey';
import Parrot from './Parrot';
import ThongTin from './ThongTin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<BatDau />} />
          <Route path="/trang-chu" element={<TrangChu />} />
          <Route path="/thoi-gian" element={<ThoiGian />} />
          <Route path="/thong-tin" element={<ThongTin />} />
          <Route path="/gecko" element={<Gecko />} />
          <Route path="/kangaroo" element={<Kangaroo />} />
          <Route path="/chicken" element={<Chicken />} />
          <Route path="/monkey" element={<Monkey />} />
          <Route path="/parrot" element={<Parrot />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
