import axios from 'axios';
import { date, time } from './getDate';
import { emojies } from './weatherEmoji';
import { WeatherData } from './interface';
import { TideData } from './interface';

const key1 = '4cO3mbOrpYGMwt0QP2coIoApx8hLR0KNJxAIzQ1gHQHSLQcODgd/Pdn6vlQsamSDSzloxkX2N24lFEdHxQCGow==';
const key2 = 'XxVn8I4Z6RnfRQJ3pth6hQ==';

export const fetchWeatherData = async (): Promise<WeatherData> => {
    try {
        const res = await axios.get('http://apis.data.go.kr/1360000/BeachInfoservice/getUltraSrtFcstBeach', {
            params: {
                serviceKey: key1,
                numOfRows: 28,
                pageNo: 1,
                dataType: 'JSON',
                base_date: date,
                base_time: time,
                beach_num: 1 // 임시값
            }
        });

        const items = res.data.response.body.items.item;

        // 온도 정보
        const tmp = items
            .filter((item: any) => item.category === 'T1H')
            .slice(0, 3)
            .map((item: any) => ({
                fcstTime: item.fcstTime,
                fcstValue: item.fcstValue
            }));

        // 하늘 상태 객체
        const skyMap: { [key: string]: { description: string, emoji: string } } = {
            "1": { description: '맑음', emoji: emojies.sunny },
            "3": { description: '구름 많음', emoji: emojies.manyCloud },
            "4": { description: '흐림', emoji: emojies.cloudy }
        };

        // 강수량 객체 
        const ptyMap: { [key: string]: { description: string, emoji: string } } = {
            "0": { description: '강수량 없음', emoji: "" },
            "1": { description: '비', emoji: emojies.raining },
            "2": { description: '비/눈', emoji: emojies.rainAndSnow },
            "3": { description: '눈', emoji: emojies.snowy },
            "5": { description: '빗방울', emoji: emojies.raining },
            "6": { description: '빗방울 눈날림', emoji: emojies.rainAndSnow },
            "7": { description: '눈날림', emoji: emojies.rainAndSnow }
        };

        // 강수량 및 하늘 상태 값 가져오기
        const ptyValue = items.find((item: any) => item.category === "PTY")?.fcstValue || "0";
        const skyValue = items.find((item: any) => item.category === "SKY")?.fcstValue || "1";

        // sky와 pty에 따른 최종 emoji 결정
        const sky = skyMap[skyValue]?.description || "";
        const pty = ptyMap[ptyValue]?.description || "";
        const emoji = ptyValue === "0" ? skyMap[skyValue]?.emoji || "" : ptyMap[ptyValue]?.emoji || "";

        console.log("API 호출 성공:", { tmp, pty, sky, emoji });
        return { tmp, pty, sky, emoji };
    } catch (error) {
        console.error("API 호출 실패: ", error);
        throw new Error("데이터를 가져오는 중 오류가 발생했습니다.");
    }
};

export const fetchWaveHeight = async () => {
    try {
        const res = await axios.get('http://apis.data.go.kr/1360000/BeachInfoservice/getWhBuoyBeach', {
            params: {
                serviceKey: key1,
                numOfRows: 28,
                pageNo: 1,
                dataType: 'JSON',
                base_date: date,
                base_time: time,
                beach_num: 1 // 임시값
            }
        });


    } catch (error) {
        console.error("API 호출 실패: ", error);
        throw new Error("파고 데이터를 가져오는 중 오류가 발생했습니다.");
    }
}

// 조석 예측, 실측
export const fetchTide = async () => {
    try {
        const res = await axios.get('http://www.khoa.go.kr/api/oceangrid/tideCurPre/search.do', {
            params: {
                ServiceKey: key2,
                ObsCode: 'DT_0063', // 임시값
                Date: date,
                ResultType: 'json'
            }
        })

        const items = res.data.result.data;
        console.log('Tide:', items);

    } catch (error) {
        console.error("API 호출 실패: ", error);
        throw new Error("파고 데이터를 가져오는 중 오류가 발생했습니다.");
    }
}

// 만조, 간조
export const fetchHighAndLowTide = async (): Promise<TideData[]> => {
    try {
        const res = await axios.get('http://www.khoa.go.kr/api/oceangrid/tideObsPreTab/search.do', {
            params: {
                ServiceKey: key2,
                ObsCode: 'DT_0063', // 임시값
                Date: date,
                ResultType: 'json'
            }
        })

        const items = res.data.result.data;
        console.log('High and Low Tide:', items);

        return items;

    } catch (error) {
        console.error("API 호출 실패: ", error);
        throw new Error("파고 데이터를 가져오는 중 오류가 발생했습니다.");
    }
}