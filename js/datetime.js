function time() {
    // 1. Define target timezones
    const timezones = [
        { label: "Sydney", tz: "Australia/Sydney" },
        { label: "Brisbane", tz: "Australia/Brisbane" },
        { label: "Seattle", tz: "America/Los_Angeles" }
    ];

    const now = new Date();
    let displayHTML = "";

    timezones.forEach((tzData, index) => {
        // 2. Strict component formatting options
        const formatter = new Intl.DateTimeFormat('en-AU', {
            timeZone: tzData.tz,
            hour12: false,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            weekday: 'long',
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            timeZoneName: 'short' // Safely gets abbreviations directly like AEST or ADT
        });

        const parts = formatter.formatToParts(now);
        const v = {};
        parts.forEach(({type, value}) => { v[type] = value; });

        // 3. Process 12-hour formatting math manually
        let hour24 = parseInt(v.hour);
        let period = hour24 >= 12 ? "PM" : "AM";
        
        let hour12 = hour24;
        if (hour12 === 0) {
            hour12 = 12;
        } else if (hour12 > 12) {
            hour12 = hour12 - 12;
        }

        // 4. Formatting strings
        let name_weekday = v.weekday.slice(0, 3).toUpperCase();
        let day = ("0" + v.day).slice(-2); 
        let month = v.month.toUpperCase();
        let year = v.year;
        let timezoneAbbreviation = v.timeZoneName ? v.timeZoneName.toUpperCase() : "AEST";

        // 5. Zero-pad components
        let hourStr = update(hour12);
        let minuteStr = update(v.minute);
        let secondStr = update(v.second);

        // 6. Build the text rows cleanly
        displayHTML += `<strong>${tzData.label}:</strong> ${name_weekday} ${day} ${month} ${year}<br/>${hourStr}:${minuteStr}:${secondStr} ${period} timezone ${timezoneAbbreviation}`;
        
        if (index < timezones.length - 1) {
            displayHTML += "<br/><br/>";
        }
    });

    // 7. Push once to DOM container
    const clockElement = document.getElementById("text");
    if (clockElement) {
        clockElement.innerHTML = displayHTML;
    }

    setTimeout(time, 1000);
}

function update(t) {
    let num = parseInt(t);
    if (num < 10) {
        return "0" + num;
    } else {
        return num;
    }
}

document.addEventListener('DOMContentLoaded', time);