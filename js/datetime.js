function time() {
    const timezones = [
        { label: "Sydney", tz: "Australia/Sydney" },
        { label: "Brisbane", tz: "Australia/Brisbane" },
        { label: "Seattle", tz: "America/Los_Angeles" }
    ];

    const now = new Date();
    let displayHTML = '<div class="clock-vertical-stack">';

    timezones.forEach((tzData) => {
        const formatter = new Intl.DateTimeFormat('en-AU', {
            timeZone: tzData.tz,
            hour12: false,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            weekday: 'long',
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        });

        const parts = formatter.formatToParts(now);
        const v = {};
        parts.forEach(({type, value}) => { v[type] = value; });

        let hour24 = parseInt(v.hour);
        let period = hour24 >= 12 ? "PM" : "AM";
        let hour12 = hour24 % 12 || 12;

        let name_weekday = v.weekday.slice(0, 3).toUpperCase();
        let day = ("0" + v.day).slice(-2);
        let month = v.month.toUpperCase();
        let year = v.year;

        let timezoneAbbreviation = "";
        if (tzData.tz === "Australia/Sydney") {
            const isDST = new Intl.DateTimeFormat('en-AU', { timeZone: tzData.tz, timeZoneName: 'short' })
                .formatToParts(now).some(p => p.type === 'timeZoneName' && (p.value.includes('AEDT') || p.value.includes('+11')));
            timezoneAbbreviation = isDST ? "AEDT" : "AEST";
        } else if (tzData.tz === "Australia/Brisbane") {
            timezoneAbbreviation = "AEST";
        } else if (tzData.tz === "America/Los_Angeles") {
            const usTz = new Intl.DateTimeFormat('en-US', { timeZone: tzData.tz, timeZoneName: 'short' })
                .formatToParts(now).find(p => p.type === 'timeZoneName')?.value || "";
            timezoneAbbreviation = usTz.toUpperCase();
            if (timezoneAbbreviation === "GMT-7") timezoneAbbreviation = "PDT";
            if (timezoneAbbreviation === "GMT-8") timezoneAbbreviation = "PST";
        }

        let hourStr = update(hour12);
        let minuteStr = update(v.minute);
        let secondStr = update(v.second);

        displayHTML += `
            <div class="clock-entry">
                <strong>${tzData.label}:</strong> ${name_weekday} ${day}/${month}/${year}<br/>
                ${hourStr}:${minuteStr}:${secondStr} ${period} timezone ${timezoneAbbreviation}
            </div>`;
    });

    displayHTML += '</div>';

    const clockElement = document.getElementById("datetime-clock") || document.getElementById("text");
    if (clockElement) {
        clockElement.innerHTML = displayHTML;
    }

    setTimeout(time, 1000);
}

function update(t) {
    let num = parseInt(t);
    return num < 10 ? "0" + num : num;
}

document.addEventListener('DOMContentLoaded', time);
