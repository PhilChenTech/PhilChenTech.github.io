import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import './WorkCountdownPage.css';

const WorkCountdownPage: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [countdown, setCountdown] = useState<string>('計算中...');

  const updateClock = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const weekday = weekdays[now.getDay()];

    const fullTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds} ${weekday}`;
    setCurrentTime(`現在時間: ${fullTime}`);
  };

  const updateCountdown = () => {
    const now = new Date();
    const day = now.getDay();
    let targetTime = new Date();

    const isWeekend = (day === 0 || day === 6);

    if (isWeekend || now.getHours() >= 18) {
      targetTime.setDate(targetTime.getDate() + 1);
      targetTime.setHours(9, 0, 0, 0);

      while (targetTime.getDay() === 0 || targetTime.getDay() === 6) {
        targetTime.setDate(targetTime.getDate() + 1);
      }

      const diff = targetTime.getTime() - now.getTime();
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      setCountdown(`距離上班還有 ${h} 小時 ${m} 分 ${s} 秒`);
    } else {
      targetTime.setHours(18, 0, 0, 0);
      const diff = targetTime.getTime() - now.getTime();
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      setCountdown(`距離下班還有 ${h} 小時 ${m} 分 ${s} 秒`);
    }
  };

  useEffect(() => {
    updateClock();
    updateCountdown();
    
    const interval = setInterval(() => {
      updateClock();
      updateCountdown();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout title="上下班倒數計時">
      <div className="work-countdown-container">
        <div className="clock">{currentTime}</div>
        <div className="countdown">{countdown}</div>
      </div>
    </Layout>
  );
};

export default WorkCountdownPage;