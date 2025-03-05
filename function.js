document.addEventListener("DOMContentLoaded", function () {
    const activateBtn = document.getElementById("activateCalendar");
    const calendarContainer = document.getElementById("calendarContainer");
    const monthSelector = document.getElementById("monthSelector");
    const yearSelector = document.getElementById("yearSelector");
    const updateCalendarBtn = document.getElementById("updateCalendar");
    const calendarControls = document.getElementById("calendarControls");
    const popup = document.getElementById("notification-popup");
    const allowBtn = document.getElementById("allow-btn");
    const denyBtn = document.getElementById("deny-btn");


    // Populate month and year dropdowns
    for (let i = 0; i < 12; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.text = new Date(2025, i).toLocaleString('default', { month: 'long' });
        monthSelector.appendChild(option);
    }

    let currentYear = new Date().getFullYear();
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.text = i;
        yearSelector.appendChild(option);
    }

    // Activate calendar
    activateBtn.addEventListener("click", function () {
        calendarContainer.classList.toggle("hidden");
        calendarControls.classList.toggle("hidden");
        generateCalendar(new Date().getMonth(), new Date().getFullYear());
    });

    // Update calendar when selecting a month or year
    updateCalendarBtn.addEventListener("click", function () {
        generateCalendar(parseInt(monthSelector.value), parseInt(yearSelector.value));
    });



    function generateCalendar(month, year) {
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const holidays = {
            "1-1": "New Year's Day",
            "1-26": "Australia Day",
            "2-14": "Valentine's Day",
            "3-1": "International Women's Day",
            "5-1": "International Workers' Day",
            "6-5": "World Environment Day",
            "7-1": "Canada Day",
            "7-4": "USA's Independence Days",
            "7-14": "Bastille Day",
            "8-15": "India's Independence Days",
            "10-31": "Halloween",
            "11-1": "All Saints' Day",
            "11-11": "Remembrance Day",
            "12-25": "Christmas",
            "12-31": "New Year's Eve"
        };

        let calendarHTML = `<div class="calendar">
                                <div class="calendar-header">${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}</div>
                                <div class="calendar-days">`;

        // Days of the week
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        daysOfWeek.forEach(day => {
            calendarHTML += `<div class="day header">${day}</div>`;
        });

        for (let i = 0; i < firstDay; i++) {
            calendarHTML += `<div class="day empty"></div>`;
        }

        for (let day = 1; day <= daysInMonth; day++) {
            let dateKey = `${month + 1}-${day}`;
            let extraClass = holidays[dateKey] ? "holiday" : "";

            calendarHTML += `<div class="day ${extraClass}" data-date="${year}-${month + 1}-${day}">
                                ${day}
                            </div>`;
        }

        

        calendarHTML += `</div></div>`;
        calendarContainer.innerHTML = calendarHTML;
    }
});


    // Show the popup after 2 seconds
    setTimeout(() => {
        popup.style.display = "block";
    }, 2000);

    allowBtn.addEventListener("click", () => {
        // Request browser notification permission
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification("Telephinus", {
                    body: "You have enabled notifications!",
                    icon: "https://example.com/notification-icon.png"
                });
            }
        });

        popup.style.display = "none";
    });

    denyBtn.addEventListener("click", () => {
        popup.style.display = "none";
    });
