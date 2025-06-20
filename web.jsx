import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StockPage from './pages/StockPage';
import HeatmapPage from './pages/HeatmapPage';

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Stock</Link> | <Link to="/heatmap">Heatmap</Link>
      </nav>
      <Routes>
        <Route path="/" element={<StockPage />} />
        <Route path="/heatmap" element={<HeatmapPage />} />
      </Routes>
    </Router>
  );
}

// pages/StockPage.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

export default function StockPage() {
  const [data, setData] = useState([]);
  const [ticker, setTicker] = useState('NVDA');
  const [minutes, setMinutes] = useState(30);

  useEffect(() => {
    axios.get(`http://20.244.56.144/evaluation-service/stocks/${ticker}?minutes=${minutes}`)
      .then(res => setData(res.data))
      .catch(console.error);
  }, [ticker, minutes]);

  return (
    <div>
      <h2>{ticker} Stock Chart (last {minutes} mins)</h2>
      <select onChange={e => setMinutes(e.target.value)}>
        {[10, 30, 60].map(m => <option key={m}>{m}</option>)}
      </select>
      <LineChart width={600} height={300} data={data}>
        <XAxis dataKey="lastUpdatedAt" /><YAxis />
        <Tooltip /><Line type="monotone" dataKey="price" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}

// pages/HeatmapPage.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function HeatmapPage() {
  const [stocks, setStocks] = useState({});

  useEffect(() => {
    axios.get('http://20.244.56.144/evaluation-service/stocks')
      .then(res => setStocks(res.data.stocks))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Correlation Heatmap</h2>
      <p>Heatmap generation coming soon...</p>
    </div>
  );
}
