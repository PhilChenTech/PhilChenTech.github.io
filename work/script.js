function updateClock() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份從 0 開始
    const date = String(now.getDate()).padStart(2, '0');

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const weekday = weekdays[now.getDay()];

    const fullTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds} ${weekday}`;
    document.getElementById("clock").innerText = `現在時間: ${fullTime}`;
}


function updateCountdown() {
    const now = new Date();
    const day = now.getDay(); // 0:週日, 6:週六
    let targetTime = new Date();

    const isWeekend = (day === 0 || day === 6);

    if (isWeekend || now.getHours() >= 18) {
        targetTime.setDate(targetTime.getDate() + 1);
        targetTime.setHours(9, 0, 0, 0);

        while (targetTime.getDay() === 0 || targetTime.getDay() === 6) {
            targetTime.setDate(targetTime.getDate() + 1);
        }

        const diff = targetTime - now;
        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        document.getElementById("countdown").innerText =
            `距離上班還有 ${h} 小時 ${m} 分 ${s} 秒`;
    } else {
        targetTime.setHours(18, 0, 0, 0);
        const diff = targetTime - now;
        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        document.getElementById("countdown").innerText =
            `距離下班還有 ${h} 小時 ${m} 分 ${s} 秒`;
    }
}

updateClock();
updateCountdown();
setInterval(updateClock, 1000);
setInterval(updateCountdown, 1000);
