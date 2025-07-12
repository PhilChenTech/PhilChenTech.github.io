document.addEventListener("DOMContentLoaded", function () {
    const calendarEl = document.getElementById("calendar");

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
            const allEvents = results.flat(); // 合併所有事件

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
        })
        .catch(error => {
            console.error("讀取假日資料時發生錯誤:", error);
        });
});
