function addWeekendEvents(year) {
    const weekends = [];
    const start = new Date(`${year}-01-01`);
    const end = new Date(`${year}-12-31`);
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const day = d.getDay();
        if (day === 0 || day === 6) {
            weekends.push({
                title: "週末",
                start: d.toISOString().split("T")[0],
                display: "background",
                backgroundColor: "#e0f2ff",
            });
        }
    }
    return weekends;
}

document.addEventListener("DOMContentLoaded", function () {
    const calendarEl = document.getElementById("calendar");

    const holidays = [
        { title: "元旦", start: "2025-01-01", color: "#007aff" },
        { title: "彈性休假", start: "2025-01-27", color: "#fb923c" },
        { title: "除夕", start: "2025-01-28", color: "#007aff" },
        { title: "春節", start: "2025-01-29", end: "2025-01-31", color: "#007aff" },
        { title: "和平紀念日", start: "2025-02-28", color: "#007aff" },
        { title: "補假", start: "2025-04-03", color: "#fb923c" },
        { title: "兒童節／清明節", start: "2025-04-04", color: "#007aff" },
        { title: "補假", start: "2025-05-30", color: "#fb923c" },
        { title: "端午節", start: "2025-05-31", color: "#007aff" },
        { title: "補假", start: "2025-09-28", color: "#fb923c" },
        { title: "孔子誕辰紀念日", start: "2025-09-29", color: "#007aff" },
        { title: "中秋節", start: "2025-10-06", color: "#007aff" },
        { title: "國慶日", start: "2025-10-10", color: "#007aff" },
        { title: "補假", start: "2025-10-24", color: "#fb923c" },
        { title: "台灣光復", start: "2025-10-25", color: "#007aff" },
        { title: "行憲紀念日", start: "2025-12-25", color: "#007aff" }
    ];

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
        locale: "zh-tw",
        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "",
        },
        events: [
            ...holidays,
            ...addWeekendEvents(2025)
        ],
    });

    calendar.render();
});
