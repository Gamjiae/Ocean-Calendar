let today = new Date();
let year = today.getFullYear();
let month = String(today.getMonth() + 1).padStart(2, "0");
let day = String(today.getDate()).padStart(2, "0");

let hour = today.getHours();
let minute = today.getMinutes();
export let time = "";

// API를 1시간 단위로 설정하기 위한 조건 처리
if (minute < 45) {
    if (hour === 0) { // 자졍일 경우
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
    time = String(hour).padStart(2, "0") + "30";
} else {
    time = String(hour).padStart(2, "0") + "30";
}

export let date = `${year}${month}${day}`;