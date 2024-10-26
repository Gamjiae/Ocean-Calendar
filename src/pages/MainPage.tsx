import "../App.css"
import { useState, useEffect } from 'react'
import axios from 'axios'

import Header from "../components/Header"
import Weather from '../components/card/Weather'
import WaterTmp from '../components/card/WaterTmp'
import TideAndSun from "../components/card/TideAndSun"
import AutoSearch from "../components/AutoSearch"
import { date, time } from '../getDate'
import { emojies } from '../weatherEmoji'

const MainPage: React.FC = () => {
    const [sky, setSky] = useState<string>(""); // 하늘상태
    const [emoji, setEmoji] = useState<string>("");
    const [tmp, setTmp] = useState<string>(""); // 기온
    const [pty, setPty] = useState<string>(""); // 강수형태
    const [beach, setBeach] = useState<string>("");

    const key = '4cO3mbOrpYGMwt0QP2coIoApx8hLR0KNJxAIzQ1gHQHSLQcODgd/Pdn6vlQsamSDSzloxkX2N24lFEdHxQCGow==';

    const callApi = () => {
        axios.get('http://apis.data.go.kr/1360000/BeachInfoservice/getUltraSrtFcstBeach', {
            params: {
                serviceKey: key,
                numOfRows: 60, 
                pageNo: 1,
                dataType: 'JSON',
                base_date: date,
                base_time: time,
                beach_num: 1 // 임시값
            }
        })
        .then(function (res) {
            console.log("API 호출 성공:", res.data.response.body.items);
            const items = res.data.response.body.items.item;

            const localTmp = items.find((item: any) => item.category === "T1H")?.fcstValue;
            const localPty = items.find((item: any) => item.category === "PTY")?.fcstValue;
            const localSky = items.find((item: any) => item.category === "SKY")?.fcstValue;

            if (localTmp) setTmp(localTmp);
            if (localSky) setSky(localSky);

            // 강수, 하늘 상태에 따른 이모지 설정
            if (localPty) {
                switch(localPty) {
                    case "0": {
                        setPty('강수량 없음');
                        switch(localSky) {
                            case "1": setEmoji(emojies.sunny); break;
                            case "3": setEmoji(emojies.manyCloud); break;
                            case "4": setEmoji(emojies.cloudy); break;
                            default: setEmoji("");
                        }
                    } break;
                    case "1": {
                        setPty('비'); 
                        setEmoji(emojies.raining);
                    } break;
                    case "2": {
                        setPty('비/눈'); 
                        setEmoji(emojies.rainAndSnow);
                    } break;
                    case "3": {
                        setPty('눈'); 
                        setEmoji(emojies.snowy);
                    } break;
                    case "5": {
                        setPty('빗방울'); 
                        setEmoji(emojies.raining);
                    } break;
                    case "6": {
                        setPty('빗방울 눈날림'); 
                        setEmoji(emojies.rainAndSnow);
                    } break;
                    case "7": {
                        setPty('눈날림'); 
                        setEmoji(emojies.rainAndSnow);
                    } break;
                }
            }    

            console.log("tmp:", tmp, "pty:", pty, "sky:", sky, "emoji", emoji);
        })
        .catch((error) => {
            console.error("API 호출 실패: ", error);
        })
    }
    
    useEffect(() => {
        callApi();
    }, []);
    
    return (
        <div 
            className='w-screen h-screen bg-cover' 
            style={{backgroundImage: 'url(images/background.png)'}}
        >
            <Header showTitle={false}/>

            <span className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl">Ocean Calendar</span>
            
            <div className="absolute flex w-4/5 justify-around top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-10">
                <Weather emoji={emoji} sky={sky} pty={pty} tmp={tmp}/>
                <WaterTmp />
                <TideAndSun />
            </div>

            <AutoSearch setBeach={setBeach}/>
        </div>
    )
}

export default MainPage