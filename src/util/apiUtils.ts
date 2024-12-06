import { WeatherItem } from "./interface";

export const emojies = {
    sunny: 'images/sunny.png',        // 맑음 (1)
    manyCloud: 'images/manyCloud.png',  // 구름 많음 (3)
    cloudy: 'images/cloudy.png',     // 흐림 (4)
    raining: 'images/raining.png',
    rainAndSnow: 'images/rainAndSnow.png',
    snowy: 'images/snowy.png'
}

const skyMap: { [key: string]: { description: string, emoji: string } } = {
    "1": { description: '맑음', emoji: emojies.sunny },
    "3": { description: '구름 많음', emoji: emojies.manyCloud },
    "4": { description: '흐림', emoji: emojies.cloudy }
};

const ptyMap: { [key: string]: { description: string, emoji: string } } = {
    "0": { description: '강수량 없음', emoji: "" },
    "1": { description: '비', emoji: emojies.raining },
    "2": { description: '비/눈', emoji: emojies.rainAndSnow },
    "3": { description: '눈', emoji: emojies.snowy },
    "5": { description: '빗방울', emoji: emojies.raining },
    "6": { description: '빗방울 눈날림', emoji: emojies.rainAndSnow },
    "7": { description: '눈날림', emoji: emojies.rainAndSnow }
};

const filterItem = (data: WeatherItem[], name: string) => {
    const newData = data
        .filter((item) => item.category === name)
        .map((item) => ({
            fcstDate: item.fcstDate,
            fcstTime: item.fcstTime,
            fcstValue: item.fcstValue
        })
    );

    return newData;
}
// 초단기 날씨 데이터에서 정보를 추출하는 함수
export const processWeatherItems = (items: WeatherItem[]) => {
    const tmp = filterItem(items, 'T1H'); // 기온
    const wsd = filterItem(items, 'WSD'); // 풍속
    const rn1 = filterItem(items, "RN1"); // 강수량
    
    // 강수형태, 하늘 상태, 풍속 값 가져오기
    const ptyValue = items.find((item) => item.category === "PTY")?.fcstValue || "0";
    const skyValue = items.find((item) => item.category === "SKY")?.fcstValue || "1";

    // sky와 pty에 따른 최종 emoji 결정
    const sky = skyMap[skyValue]?.description || "";
    const pty = ptyMap[ptyValue]?.description || "";
    const emoji = ptyValue === "0" ? skyMap[skyValue]?.emoji || "" : ptyMap[ptyValue]?.emoji || "";
    
    return { tmp, pty, sky, emoji, wsd, rn1 };
};

export const formatDateToYYYYMMDD = (date: Date): { year: string; month: string; day: string; fullDate: string } => {
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const fullDate = year + month + day;

    return { year, month, day, fullDate };
};

// 일주일간의 날짜 구하기
export const getWeekDates = (baseDate: Date) => {
    const date = new Date(baseDate); // 기준 날짜
    const dayOfWeek = (date.getDay() + 6) % 7; // 요일 계산 (0: 월요일, 6: 일요일)
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - dayOfWeek); // 기준 날짜에서 (요일 수 - 월요일)만큼 빼기

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(startOfWeek);
        currentDate.setDate(startOfWeek.getDate() + i);

        // YYYYMMDD 형식으로 변환
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}${month}${day}`;

        weekDates.push(formattedDate);
    }

    return weekDates;
};

export const getTimeArray = () => {
    const result = [];
    const now = new Date();
    const endHour = now.getHours();
    const endMinute = now.getMinutes(); // 현재 시간의 분

    // 시작 시간을 00시 현재 분으로 설정
    let currentHour = 0;
    let currentMinute = endMinute;

    while (currentHour < endHour || (currentHour === endHour && currentMinute <= endMinute)) {
        // 시간을 "HHMM" 형식으로 배열에 추가
        const formattedTime = `${String(currentHour).padStart(2, '0')}${String(currentMinute).padStart(2, '0')}`;
        result.push(formattedTime);

        // 한 시간 간격으로 시간 업데이트
        currentHour += 1;
        if (currentHour === 24) {
            break; // 24시를 넘지 않도록 종료
        }
    }

    return result;
}