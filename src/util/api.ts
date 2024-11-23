import axios from 'axios';
import { date, timeForWaterTemp, timeForWeather } from './getDate';
import { WeatherItem, WaterTempItem, TideData } from './interface';

const key1 = '4cO3mbOrpYGMwt0QP2coIoApx8hLR0KNJxAIzQ1gHQHSLQcODgd/Pdn6vlQsamSDSzloxkX2N24lFEdHxQCGow==';
const key2 = 'XxVn8I4Z6RnfRQJ3pth6hQ==';

export const FetchWeatherData = async (num: number): Promise<WeatherItem[]> => {
    
    try {
        const res = await axios.get('http://apis.data.go.kr/1360000/BeachInfoservice/getUltraSrtFcstBeach', {
            params: {
                serviceKey: key1,
                numOfRows: 60,
                pageNo: 1,
                dataType: 'JSON',
                base_date: date,
                base_time: timeForWeather,
                beach_num: num 
            }
        });

        const items = res.data.response.body.items.item;

        console.log('items: ', items);
        
        return items;
    } catch (error) {
        console.error("API 호출 실패: ", error);
        throw new Error("초단기 날씨 데이터를 가져오는 중 오류가 발생했습니다.");
    }
};

export const fetchWaterTemp = async (num: number): Promise<WaterTempItem[]> => {
    try {
        const results: WaterTempItem[] = [];

        for (const time of timeForWaterTemp) {
            const res = await axios.get('http://apis.data.go.kr/1360000/BeachInfoservice/getTwBuoyBeach?', {
                params: {
                    serviceKey: key1,
                    dataType: 'JSON',
                    beach_num: num,
                    searchTime: date + time,
                },
            });
            results.push(...res.data.response.body.items.item);
        }

        console.log('Water Temperature for 12 Hours:', results);
        return results;

    } catch (error) {
        console.error("API 호출 실패: ", error);
        throw new Error("수온 데이터를 가져오는 중 오류가 발생했습니다.");
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
                base_time: timeForWeather,
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
export const fetchHighAndLowTide = async (stationId: string): Promise<TideData[]> => {
    try {
        const res = await axios.get('http://www.khoa.go.kr/api/oceangrid/tideObsPreTab/search.do', {
            params: {
                ServiceKey: key2,
                ObsCode: stationId, 
                Date: date,
                ResultType: 'json'
            }
        })

        const items = res.data.result.data;
        console.log('High and Low Tide:', items);

        return items;

    } catch (error) {
        console.error("API 호출 실패: ", error);
        throw new Error("만조, 간조 데이터를 가져오는 중 오류가 발생했습니다.");
    }
}