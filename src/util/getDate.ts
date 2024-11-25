let today = new Date();
let year = today.getFullYear();
let month = String(today.getMonth() + 1).padStart(2, "0");
let day = String(today.getDate()).padStart(2, "0");

let hour = today.getHours();
let minute = today.getMinutes();

export let timeForWeather = "";
export let timeForMain = [""];
export let timeForWT = [""];

// 초단기 API를 1시간 단위로 설정
if (minute < 45) {
    if (hour === 0) { // 자정일 경우
        hour = 23;

        // 전날 날짜로 설정
        let yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        year = yesterday.getFullYear();
        month = String(yesterday.getMonth() + 1).padStart(2, "0");
        day = String(yesterday.getDate()).padStart(2, "0");
    } else {
        hour -= 1;
    }
    timeForWeather = String(hour).padStart(2, "0") + "30";
} else {
    timeForWeather = String(hour).padStart(2, "0") + "30";
}

export let date = `${year}${month}${day}`;

// 수온 API를 위한 시간 설정 (3시간 이전부터 지금까지의 시간)
for (let i = 0; i < 3; i++) {
    let tempHour = hour - i;
    if (tempHour < 0) {
        tempHour += 24;
    }

    timeForMain[i] = String(tempHour).padStart(2, "0") + String(minute).padStart(2, "0");
}

for (let i = 0; i <= hour; i++) {
    let tempHour = hour - i;
    timeForWT[i] = String(tempHour).padStart(2, '0') + "30";
}