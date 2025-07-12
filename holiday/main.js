document.addEventListener("DOMContentLoaded", function () {
    const calendarEl = document.getElementById("calendar");

    fetch("./2025-holiday.json")
        .then(response => response.json())
        .then(holidays => {
            const calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: "dayGridMonth",
                locale: "zh-tw",
                headerToolbar: {
                    left: "prev,next today",
                    center: "title",
                    right: "",
                },
                events: [
                    ...holidays
                ],
            });

            calendar.render();
        })
        .catch(error => {
            console.error("讀取假日資料錯誤:", error);
        });
});
