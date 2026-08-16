/* =====================================================
   SCREEN 1 — OPENING
   ===================================================== */

const openingScreen =
    document.getElementById("opening-screen");

const reactionScreen =
    document.getElementById("reaction-screen");

const yesButton =
    document.getElementById("yes-btn");

const noButton =
    document.getElementById("no-btn");

const continueButton =
    document.getElementById("continue-btn");


/* YES */

yesButton.addEventListener("click", function () {

    openingScreen.style.display = "none";
    reactionScreen.style.display = "flex";

});


/* NO */

noButton.addEventListener("click", function () {

    console.log("NO BUTTON CLICKED");

});


/* =====================================================
   SCREEN 3 — DATE SELECTION
   ===================================================== */

const dateScreen =
    document.getElementById("date-screen");

const calendarDays =
    document.getElementById("calendar-days");

const calendarMonth =
    document.getElementById("calendar-month");

const calendarYear =
    document.getElementById("calendar-year");

const previousMonthBtn =
    document.getElementById("previous-month");

const nextMonthBtn =
    document.getElementById("next-month");

const selectedDateText =
    document.getElementById("selected-date");

const dateContinueBtn =
    document.getElementById("date-continue-btn");


const calendarYearValue = 2026;

let currentMonth =
    new Date().getMonth();

let selectedDate = null;


const monthNames = [

    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"

];


const today = new Date();


function formatDate(date) {

    return date.toLocaleDateString("en-US", {

        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"

    });

}


function generateCalendar() {

    calendarDays.innerHTML = "";

    calendarMonth.textContent =
        monthNames[currentMonth];

    calendarYear.textContent =
        calendarYearValue;


    const firstDay =
        new Date(
            calendarYearValue,
            currentMonth,
            1
        ).getDay();


    const daysInMonth =
        new Date(
            calendarYearValue,
            currentMonth + 1,
            0
        ).getDate();


    const todayOnly =
        new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );


    /* Empty spaces */

    for (
        let i = 0;
        i < firstDay;
        i++
    ) {

        const emptyDay =
            document.createElement("div");

        emptyDay.classList.add(
            "empty-day"
        );

        calendarDays.appendChild(
            emptyDay
        );

    }


    /* Dates */

    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const dayButton =
            document.createElement("button");

        dayButton.textContent = day;

        dayButton.classList.add(
            "calendar-day"
        );


        const date =
            new Date(
                calendarYearValue,
                currentMonth,
                day
            );


        /* Disable past dates */

        if (date < todayOnly) {

            dayButton.disabled = true;

            dayButton.classList.add(
                "disabled"
            );

        }


        /* Today */

        if (

            date.getFullYear() ===
                todayOnly.getFullYear()

            &&

            date.getMonth() ===
                todayOnly.getMonth()

            &&

            date.getDate() ===
                todayOnly.getDate()

        ) {

            dayButton.classList.add(
                "today"
            );

        }


        /* Selected date */

        if (

            selectedDate &&

            date.getTime() ===
                selectedDate.getTime()

        ) {

            dayButton.classList.add(
                "selected"
            );

        }


        /* Select date */

        dayButton.addEventListener(
            "click",
            function () {

                selectedDate = date;

                selectedDateText.textContent =
                    `Selected: ${formatDate(selectedDate)} ❤️`;

                dateContinueBtn.disabled =
                    false;

                generateCalendar();

            }
        );


        calendarDays.appendChild(
            dayButton
        );

    }


    /* Navigation */

    previousMonthBtn.disabled =
        currentMonth === 0;

    nextMonthBtn.disabled =
        currentMonth === 11;

}


/* Previous month */

previousMonthBtn.addEventListener(
    "click",
    function () {

        if (currentMonth > 0) {

            currentMonth--;

            generateCalendar();

        }

    }
);


/* Next month */

nextMonthBtn.addEventListener(
    "click",
    function () {

        if (currentMonth < 11) {

            currentMonth++;

            generateCalendar();

        }

    }
);


/* Screen 2 → Screen 3 */

continueButton.addEventListener(
    "click",
    function () {

        reactionScreen.style.display =
            "none";

        dateScreen.style.display =
            "flex";

        generateCalendar();

    }
);


/* Screen 3 → Screen 4 */

dateContinueBtn.addEventListener(
    "click",
    function () {

        if (!selectedDate) {

            return;

        }

        dateScreen.style.display =
            "none";

        timeScreen.style.display =
            "flex";

    }
);


/* =====================================================
   SCREEN 4 — CLOCK
   ===================================================== */

const timeScreen =
    document.getElementById("time-screen");

const clockNumbers =
    document.querySelectorAll(
        ".clock-number"
    );

const hourHand =
    document.querySelector(".hour-hand");

const minuteHand =
    document.querySelector(".minute-hand");

const amButton =
    document.getElementById("am-btn");

const pmButton =
    document.getElementById("pm-btn");

const selectedTimeText =
    document.getElementById("selected-time");

const timeContinueBtn =
    document.getElementById(
        "time-continue-btn"
    );

const resetTimeBtn =
    document.getElementById(
        "reset-time-btn"
    );


let selectedHour = null;

let selectedMinute = null;

let selectedPeriod = "AM";

let selectingMinutes = false;


const hourValues = [

    "12",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11"

];


const minuteValues = [

    "00",
    "05",
    "10",
    "15",
    "20",
    "25",
    "30",
    "35",
    "40",
    "45",
    "50",
    "55"

];


/* AM */

amButton.addEventListener(
    "click",
    function () {

        selectedPeriod = "AM";

        amButton.classList.add(
            "active"
        );

        pmButton.classList.remove(
            "active"
        );

        updateSelectedTime();

    }
);


/* PM */

pmButton.addEventListener(
    "click",
    function () {

        selectedPeriod = "PM";

        pmButton.classList.add(
            "active"
        );

        amButton.classList.remove(
            "active"
        );

        updateSelectedTime();

    }
);


/* Clock numbers */

clockNumbers.forEach(
    function (number, index) {

        number.addEventListener(
            "click",
            function () {


                /* HOUR */

                if (!selectingMinutes) {

                    selectedHour =
                        Number(
                            number.dataset.hour
                        );


                    clockNumbers.forEach(
                        function (item) {

                            item.classList.remove(
                                "selected"
                            );

                        }
                    );


                    number.classList.add(
                        "selected"
                    );


                    moveHourHand(
                        selectedHour
                    );


                    selectingMinutes =
                        true;


                    /* Change numbers */

                    clockNumbers.forEach(
                        function (item, i) {

                            item.textContent =
                                minuteValues[i];

                        }
                    );


                    selectedTimeText.textContent =
                        `${selectedHour}:-- ${selectedPeriod} 💗`;

                }


                /* MINUTE */

                else {

                    selectedMinute =
                        index * 5;


                    clockNumbers.forEach(
                        function (item) {

                            item.classList.remove(
                                "selected"
                            );

                        }
                    );


                    number.classList.add(
                        "selected"
                    );


                    moveMinuteHand(
                        selectedMinute
                    );


                    updateSelectedTime();


                    timeContinueBtn.disabled =
                        false;

                }

            }
        );

    }
);


/* Hour hand */

function moveHourHand(hour) {

    let angle =
        hour * 30;

    if (hour === 12) {

        angle = 0;

    }


    hourHand.style.transform =
        `translate(-50%, -100%) rotate(${angle}deg)`;

}


/* Minute hand */

function moveMinuteHand(minute) {

    const angle =
        minute * 6;


    minuteHand.style.transform =
        `translate(-50%, -100%) rotate(${angle}deg)`;

}


/* Selected time */

function updateSelectedTime() {

    if (selectedHour === null) {

        selectedTimeText.textContent =
            "Please choose a time 💗";

        return;

    }


    if (selectedMinute === null) {

        selectedTimeText.textContent =
            `${selectedHour}:-- ${selectedPeriod} 💗`;

        return;

    }


    const formattedMinute =
        String(
            selectedMinute
        ).padStart(2, "0");


    selectedTimeText.textContent =
        `${selectedHour}:${formattedMinute} ${selectedPeriod} 💗`;

}


/* Reset */

resetTimeBtn.addEventListener(
    "click",
    function () {

        selectedHour = null;

        selectedMinute = null;

        selectingMinutes = false;

        selectedPeriod = "AM";


        amButton.classList.add(
            "active"
        );

        pmButton.classList.remove(
            "active"
        );


        clockNumbers.forEach(
            function (number, index) {

                number.classList.remove(
                    "selected"
                );

                number.textContent =
                    hourValues[index];

            }
        );


        hourHand.style.transform =
            "translate(-50%, -100%) rotate(0deg)";

        minuteHand.style.transform =
            "translate(-50%, -100%) rotate(0deg)";


        selectedTimeText.textContent =
            "Please choose a time 💗";


        timeContinueBtn.disabled =
            true;

    }
);


/* Screen 4 → Screen 5 */

timeContinueBtn.addEventListener(
    "click",
    function () {

        if (

            selectedHour === null ||

            selectedMinute === null

        ) {

            return;

        }


        timeScreen.style.display =
            "none";

        activityScreen.style.display =
            "flex";

    }
);


/* =====================================================
   SCREEN 5 — ACTIVITIES
   ===================================================== */

const activityScreen =
    document.getElementById(
        "activity-screen"
    );

const activityOptions =
    document.querySelectorAll(
        ".activity-option"
    );

const selectedActivityText =
    document.getElementById(
        "selected-activity"
    );

const activityContinueBtn =
    document.getElementById(
        "activity-continue-btn"
    );


let selectedActivities = [];


activityOptions.forEach(
    function (activity) {

        activity.addEventListener(
            "click",
            function () {

                const activityName =
                    activity.getAttribute(
                        "data-activity"
                    );


                const alreadySelected =
                    selectedActivities.includes(
                        activityName
                    );


                if (alreadySelected) {

                    selectedActivities =
                        selectedActivities.filter(
                            function (item) {

                                return item !==
                                    activityName;

                            }
                        );


                    activity.classList.remove(
                        "selected"
                    );

                }


                else {

                    selectedActivities.push(
                        activityName
                    );

                    activity.classList.add(
                        "selected"
                    );

                }


                if (
                    selectedActivities.length ===
                    0
                ) {

                    selectedActivityText.textContent =
                        "Please choose an activity 💗";

                    activityContinueBtn.disabled =
                        true;

                }


                else {

                    selectedActivityText.textContent =
                        "Selected: " +
                        selectedActivities.join(
                            ", "
                        ) +
                        " 💗";

                    activityContinueBtn.disabled =
                        false;

                }

            }
        );

    }
);


/* =====================================================
   SCREEN 6 — CONFIRMATION
   ===================================================== */

const confirmationScreen =
    document.getElementById(
        "confirmation-screen"
    );

const confirmationDate =
    document.getElementById(
        "confirmation-date"
    );

const confirmationTime =
    document.getElementById(
        "confirmation-time"
    );

const confirmationActivities =
    document.getElementById(
        "confirmation-activities"
    );

const editPlanBtn =
    document.getElementById(
        "edit-plan-btn"
    );

const confirmationContinueBtn =
    document.getElementById(
        "confirmation-continue-btn"
    );


/* Screen 5 → Screen 6 */

activityContinueBtn.addEventListener(
    "click",
    function () {

        if (
            selectedActivities.length === 0
        ) {

            return;

        }


        activityScreen.style.display =
            "none";

        confirmationScreen.style.display =
            "flex";


        confirmationDate.textContent =
            formatDate(selectedDate);


        const formattedMinute =
            String(
                selectedMinute
            ).padStart(2, "0");


        confirmationTime.textContent =
            `${selectedHour}:${formattedMinute} ${selectedPeriod}`;


        confirmationActivities.textContent =
            selectedActivities.join(
                " • "
            );

    }
);


/* Edit choices */

editPlanBtn.addEventListener(
    "click",
    function () {

        confirmationScreen.style.display =
            "none";

        dateScreen.style.display =
            "flex";

        generateCalendar();

    }
);


/* =====================================================
   SCREEN 7 — AGREEMENT
   ===================================================== */

const messageScreen =
    document.getElementById(
        "message-screen"
    );

const fakePaymentBtn =
    document.getElementById(
        "fake-payment-btn"
    );

const agreementBackBtn =
    document.getElementById(
        "agreement-back-btn"
    );


/* Screen 6 → Screen 7 */

confirmationContinueBtn.addEventListener(
    "click",
    function () {

        confirmationScreen.style.display =
            "none";

        messageScreen.style.display =
            "flex";

    }
);


/* Back */

agreementBackBtn.addEventListener(
    "click",
    function () {

        messageScreen.style.display =
            "none";

        confirmationScreen.style.display =
            "flex";

    }
);


/* =====================================================
   SCREEN 8 — TICKET
   ===================================================== */

const ticketScreen =
    document.getElementById(
        "ticket-screen"
    );

const ticketDate =
    document.getElementById(
        "ticket-date"
    );

const ticketTime =
    document.getElementById(
        "ticket-time"
    );

const ticketActivities =
    document.getElementById(
        "ticket-activities"
    );

const downloadTicketBtn =
    document.getElementById(
        "download-ticket-btn"
    );

const sendTicketBtn =
    document.getElementById(
        "send-ticket-btn"
    );

const editTicketBtn =
    document.getElementById(
        "edit-ticket-btn"
    );


/* Screen 7 → Screen 8 */

fakePaymentBtn.addEventListener(
    "click",
    function () {

        messageScreen.style.display =
            "none";

        ticketScreen.style.display =
            "flex";


        /* Date */

        if (selectedDate) {

            ticketDate.textContent =
                formatDate(selectedDate);

        }


        /* Time */

        if (

            selectedHour !== null &&

            selectedMinute !== null

        ) {

            const formattedMinute =
                String(
                    selectedMinute
                ).padStart(2, "0");


            ticketTime.textContent =
                `${selectedHour}:${formattedMinute} ${selectedPeriod}`;

        }


        /* Activities */

        ticketActivities.innerHTML =
            selectedActivities
                .map(
                    function (activity) {

                        return "• " + activity;

                    }
                )
                .join("<br>");

    }
);


/* =====================================================
   SAVE TICKET
   ===================================================== */

downloadTicketBtn.addEventListener(
    "click",
    function () {

        const ticket =
            document.getElementById(
                "ticket-card"
            );


        if (!ticket) {

            alert(
                "Ticket could not be found."
            );

            return;

        }


        if (
            typeof html2canvas ===
            "undefined"
        ) {

            alert(
                "Ticket download is not available."
            );

            return;

        }


        html2canvas(
            ticket,
            {

                scale: 2,

                backgroundColor:
                    "#ffffff"

            }
        )
        .then(
            function (canvas) {

                const link =
                    document.createElement(
                        "a"
                    );


                link.download =
                    "Deekshya-Date-Ticket.png";


                link.href =
                    canvas.toDataURL(
                        "image/png"
                    );


                document.body.appendChild(
                    link
                );


                link.click();


                document.body.removeChild(
                    link
                );

            }
        )
        .catch(
            function (error) {

                console.error(
                    "Ticket error:",
                    error
                );

                alert(
                    "Something went wrong while creating the ticket."
                );

            }
        );

    }
);


/* =====================================================
   SEND TICKET
   ===================================================== */

sendTicketBtn.addEventListener(
    "click",
    function () {

        /*
           IMPORTANT:
           Replace this with your
           WhatsApp number.

           Include country code.
           Example for India:

           919876543210
        */

        const phoneNumber =
            "YOUR_NUMBER_HERE";


        const activities =
            selectedActivities.join(
                ", "
            );


        const message =

            "🎟️ OFFICIAL DATE TICKET\n\n" +

            "Holder: Deekshya 💕\n" +

            "Date: " +
            formatDate(selectedDate) +
            "\n" +

            "Time: " +
            selectedHour +
            ":" +
            String(
                selectedMinute
            ).padStart(2, "0") +
            " " +
            selectedPeriod +
            "\n\n" +

            "Mission:\n" +
            activities +
            "\n\n" +

            "✓ APPROVED\n\n" +

            "This ticket is valid for ONE unforgettable adventure. 💕";


        const whatsappURL =
            "https://wa.me/" +
            phoneNumber +
            "?text=" +
            encodeURIComponent(
                message
            );


        window.open(
            whatsappURL,
            "_blank"
        );

    }
);


/* =====================================================
   CHANGE CHOICES FROM TICKET
   ===================================================== */

editTicketBtn.addEventListener(
    "click",
    function () {

        ticketScreen.style.display =
            "none";

        dateScreen.style.display =
            "flex";

        generateCalendar();

    }
);


/* =====================================================
   START CALENDAR
   ===================================================== */

generateCalendar();