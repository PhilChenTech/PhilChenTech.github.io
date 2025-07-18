// 將事件轉換為 iCal 格式
function convertToICS(events) {
    let icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//兔田建設//國定假日日曆//TW",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "X-WR-CALNAME:國定假日",
        "X-WR-TIMEZONE:Asia/Taipei"
    ];

    events.forEach(event => {
        icsContent = icsContent.concat([
            "BEGIN:VEVENT",
            `DTSTART;VALUE=DATE:${event.start.replace(/-/g, '')}`,
            `DTEND;VALUE=DATE:${event.start.replace(/-/g, '')}`,
            `SUMMARY:${event.title || '假日'}`,
            `CATEGORIES:${event.isHoliday ? '假日' : ''}`,
            "END:VEVENT"
        ]);
    });

    icsContent.push("END:VCALENDAR");
    return icsContent.join("\r\n");
}

document.addEventListener("DOMContentLoaded", function () {
    const calendarEl = document.getElementById("calendar");
    let allEvents = []; // 將 allEvents 移到外部作用域

    const jsonFiles = [
        "./data/2025-holiday.json",
        "./data/2026-holiday.json"
    ];

    Promise.all(jsonFiles.map(url =>
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error(`${url} 讀取失敗`);
                return response.json();
            })
            .catch(error => {
                console.error("載入錯誤：", error);
                return []; // 某個檔案錯誤也不影響其他檔案
            })
    ))
        .then(results => {
            allEvents = results.flat(); // 合併所有事件

            const calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: "dayGridMonth",
                locale: "zh-tw",
                headerToolbar: {
                    left: "prev,next today",
                    center: "title",
                    right: "",
                },
                events: allEvents,
            });

            calendar.render();

            // 設置匯出按鈕事件
            document.getElementById('exportCalendar').addEventListener('click', function() {
                // 添加按鈕點擊效果
                this.classList.add('scale-95');
                setTimeout(() => this.classList.remove('scale-95'), 200);

                const icsContent = convertToICS(allEvents);
                const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
                saveAs(blob, '國定假日.ics');
            });
        })
        .catch(error => {
            console.error("讀取假日資料時發生錯誤:", error);
        });
});
