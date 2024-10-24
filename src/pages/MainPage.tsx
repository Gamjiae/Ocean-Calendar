import "../App.css"
import { useState, useEffect } from 'react'
import axios from 'axios'
import xml2js from 'xml-js';

import Header from "../components/Header"
import AutoSearch from "../components/AutoSearch"

const MainPage: React.FC = () => {
    const [sky, setSky] = useState<string>("");
    const [tmp, setTmp] = useState<string>("");
    const [wsd, setWsd] = useState<string>("");
    const [beach, setBeach] = useState<string>("");

    let today = new Date();
    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, "0");
    let day = String(today.getDate()).padStart(2, "0");

    let hour = today.getHours();
    let minute = today.getMinutes();
    let time = "";

    if (minute < 45) { // 45분 전에는 아직 발표가 안나옴
        if (hour === 0) { // 자정일 때는 전날 23시 30분으로 설정
            hour = 23;
        } else {
            hour -= 1; // 시간을 1시간 줄임
        }
        time = String(hour).padStart(2, "0") + "30"; // 시간을 두 자리로 맞추고 "30" 추가
    } else {
        time = String(hour).padStart(2, "0") + "00"; // 현재 시간이 45분 이상이면 00분으로 설정
    }

    let date = `${year}${month}${day}`;

    const key = '4cO3mbOrpYGMwt0QP2coIoApx8hLR0KNJxAIzQ1gHQHSLQcODgd/Pdn6vlQsamSDSzloxkX2N24lFEdHxQCGow==';

    console.log(key, date, hour, beach);

    const callApi = () => {
        axios.get('http://apis.data.go.kr/1360000/BeachInfoservice/getUltraSrtFcstBeach', {
            params: {
                serviceKey: key,
                base_date: 20241024, // 임시값
                base_time: time,
                beach_num: 1 // 임시값
            },
            responseType: 'document'
        })
        .then(function (res) {
            console.log("API 호출 성공:", res.data);
            const xml = res.data;

            // DOMParser로 XML 파싱
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xml, "application/xml");

            // 'items' 요소 찾기
            const items = xmlDoc.getElementsByTagName("item");

            // 필요한 값들을 추출
            Array.from(items).forEach(item => {
                const category = item.getElementsByTagName("category")[0].textContent;
                const fcstValue = item.getElementsByTagName("fcstValue")[0].textContent;
                
                // category에 따라 해당 값을 변수에 저장
                switch (category) {
                    case 'TMP':
                        console.log("TMP:", fcstValue); // 상태 업데이트 전 값 확인
                        setTmp(fcstValue);  // 온도 저장
                        break;
                    case 'SKY':
                        console.log("SKY:", fcstValue); // 상태 업데이트 전 값 확인
                        setSky(fcstValue);  // 하늘 상태 저장
                        break;
                    case 'WSD':
                        console.log("WSD:", fcstValue); // 상태 업데이트 전 값 확인
                        setWsd(fcstValue);  // 풍속 저장
                        break;
                    // 필요한 경우 다른 category도 추가 가능
                    default:
                        break;
                }
            });
            //setSky(res.data.)
        })
    }
    // .catch(function (error) {

    // })

    useEffect(() => {
        callApi();
    }, []); // 초기 API 호출
    
    useEffect(() => {
        console.log("Updated values:", tmp, sky, wsd);
    }, [tmp, sky, wsd]); // tmp, sky, wsd가 업데이트될 때마다 콘솔에 출력
    

    return (
        <div 
            className='w-screen h-screen bg-cover' 
            style={{backgroundImage: 'url(images/background.png)'}}
        >
            <Header showTitle={false}/>

            <span className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl">Ocean Calendar</span>
            
            <div className="absolute flex w-4/5 justify-around top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-10">
                {/* 날씨 */}
                <div className="bg-white opacity-70 w-[340px] h-[290px]">
                    {/* 현재 하늘상태에 따라 바뀌는 날씨 이미지 */}
                    <span>{tmp}</span>
                    <span className="text-gray-600">비, {sky}</span>
                </div>

                {/* 수온 */}
                <div className="bg-white opacity-70 w-[340px] h-[290px]">
                    {/* 3시간 동안의 수온변화 그래프 */}
                    <span>21도</span>
                    <span className="text-gray-600">비, 구름 많음</span>
                </div>

                {/* 조석, 일출, 일몰 */}
                <div className="bg-white opacity-70 w-[340px] h-[290px]">
                    {/* 조석 */}
                    <span>21도</span>

                    {/* 일출, 일몰 */}
                    <div className="flex justify-between text-sm bottom-2">
                        <div className="flex">
                            <img
                                className="w-7 h-5 mr-1" 
                                src="images/sunrise.png"
                            />
                            <span>05 : 21</span>
                        </div>
                        <div className="flex">
                            <img
                                className="w-7 h-5 mr-1" 
                                src="images/sunset.png"
                            />
                            <span>19 : 40</span>
                        </div>
                    </div>
                </div>
            </div>
            <AutoSearch setBeach={setBeach}/>
        </div>
    )
}

export default MainPage