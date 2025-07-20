import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <h1 className="home-title">工具箱</h1>
      <div className="links">
        <Link to="/holiday" className="link-item">國定假日</Link>
        <Link to="/work" className="link-item">上下班倒數計時</Link>
        <Link to="/uuid-generator" className="link-item">UUID產生器</Link>
        <Link to="/time" className="link-item">Timestamp工具</Link>
      </div>
      <footer className="home-footer">
        <p>© 兔田建設 | 所有權利保留</p>
      </footer>
    </div>
  );
};

export default HomePage;