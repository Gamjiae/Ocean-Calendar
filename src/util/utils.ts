import { WeatherItem, WeatherResponse } from "./interface";

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

// items를 분리하는 함수
export const processWeatherItems = (items: WeatherItem[]) => {
    // 온도 정보
    const tmp = items
        .filter((item) => item.category === 'T1H')
        .slice(0, 3)
        .map((item) => ({
            fcstTime: item.fcstTime,
            fcstValue: item.fcstValue
        }));

    // 강수량 및 하늘 상태 값 가져오기
    const ptyValue = items.find((item) => item.category === "PTY")?.fcstValue || "0";
    const skyValue = items.find((item) => item.category === "SKY")?.fcstValue || "1";

    // sky와 pty에 따른 최종 emoji 결정
    const sky = skyMap[skyValue]?.description || "";
    const pty = ptyMap[ptyValue]?.description || "";
    const emoji = ptyValue === "0" ? skyMap[skyValue]?.emoji || "" : ptyMap[ptyValue]?.emoji || "";

    return { tmp, pty, sky, emoji };
};