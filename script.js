function isLeapYear(year) {
    return (year % 4 == 0 && year % 100 != 0 ) ||  (year % 400 == 0);
}
const dayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const fullNameOfWeek = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

let year, month, today, firstDay, lastDay, currentDay;
let table="";
let curDay = "";
let curDayOfWeek = "";

function initialize(){
    const now = new Date();
    year = now.getFullYear();
    month = now.getMonth();
    today = now.getDate();
    currentDay = 1;
    
    let currentTime = getTime();
    document.getElementById("watch").innerHTML = currentTime;
    
    renderCalendar();
}
function getTime() {
    const now = new Date();
    let ampm;
    let hour = now.getHours();
    let second = now.getSeconds();
    if(second >= 0 && second <=9){
        second = '0'+second;
    }
    if (hour >= 12) {
        ampm = "PM";
        if (hour > 12) {
            hour -= 12;
        }
    } else {
        ampm = "AM";
    }
    // 정오는 12시로 출력
    hour = (hour == 0) ? 12 : hour;

    let minute = now.getMinutes();
    if (minute < 10) minute = '0' + minute;
    return `${ampm} ${hour}:${minute}:${second}`;
}
function prevMonth(){
    if(month==0){
        year--;
        month=11;
    }else{
        month--;
    }
    renderCalendar();
    updateMonthList();
}
function nextMonth(){
    if(month==11){
        year++;
        month=0;
    }else{
        month++;
    }
    renderCalendar();
    updateMonthList();
}
function goToday(){
    const now = new Date();
    year = now.getFullYear();
    month = now.getMonth();
    today = now.getDate();

    renderCalendar();
    updateMonthList();
}
function updateMonthList(){
    const monthList = document.getElementById("monthList");
    const months = monthList.getElementsByTagName("li");

    for(let i=0; i<months.length; i++){
        months[i].style.fontWeight = "normal";
        if(i == month){
            months[month].style.color = "rgb(46, 205, 111)";
            months[month].style.fontWeight = "bold";
        }else{
            months[i].style.color = "black";
        }
    }
}
function renderCalendar(){
    let currentTime = getTime();
    document.getElementById("watch").innerHTML = currentTime;

    const now = new Date();
    firstDay = new Date(year, month, 1);
    currentDay = 1;
    if (month == 1) {
        if (isLeapYear(year)) {
            lastDay = new Date(year, month, 29);
        } else {
            lastDay = new Date(year, month, 28);
        }
    } else if (month == 3 || month == 5 || month == 8 || month == 10) {
        lastDay = new Date(year, month, 30);
    } else {
        lastDay = new Date(year, month, 31);
    }
    curDay = today;
    document.getElementById("curDay").innerHTML = curDay;

    curDayOfWeek = fullNameOfWeek[now.getDay()];
    document.getElementById("curDayOfWeek").innerHTML = curDayOfWeek;

    let curYear=year;
    document.getElementById("curYear").innerHTML = curYear;

    const monthList = document.getElementById("monthList");
    const months = monthList.getElementsByTagName("li");
    const icon = document.getElementById("icon");

    for(let i=0; i<months.length; i++){
        months[i].style.fontWeight = "normal";
    }
    months[month].style.color = "rgb(46, 205, 111)";
    months[month].style.fontWeight = "bold";

    const iconClass=[
        "fas fa-sun",
        "fas fa-seedling",
        "fas fa-school",
        "fas fa-fan",
        "fas fa-child",
        "fas fa-flag",
        "fas fa-umbrella-beach",
        "fas fa-ice-cream",
        "fas fa-cookie",
        "fas fa-ghost",
        "fas fa-snowflake",
        "fas fa-gifts"
    ];
    icon.className=iconClass[month] || "fas fa-question";

    table = `<table>`;

    table += `<tr>`;
    for(let i=0; i<7; i++){
        table += `<th>${dayOfWeek[i]}</th>`;
    }
    table += `</tr>`;

    const firstWeekDays = 7 - firstDay.getDay();
    const totalDays = lastDay.getDate();
    const remainingDays = totalDays - firstWeekDays;
    const ROW = Math.ceil(remainingDays / 7) + 1;

    for (let i = 0; i < ROW; i++) {
        table += `<tr>`;
        for (let j = 0; j < 7; j++) {
            if (i == 0 && j < firstDay.getDay()) {
                table += `<td></td>`;
            } else if (currentDay <= totalDays) {
                let cellStyle = "";
                if(j==0){
                    cellStyle="color: red;"
                }else if(j==6){
                    cellStyle="color: blue;"
                }
                if (currentDay == today && month == now.getMonth() && year == now.getFullYear()){
                    table += `<td style="background-color: rgb(46, 205, 111); color: white;
                    ${cellStyle}">${currentDay++}</td>`;
                }else{
                    table += `<td style="${cellStyle}">${currentDay++}</td>`;
                }
            } else {
                table += `<td></td>`;
            }
        }
        table += `</tr>`;
    }
    table += `</table>`;
    document.getElementById("calendar").innerHTML = table;
}
initialize();
renderCalendar();