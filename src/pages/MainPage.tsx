// MainPage.tsx
import "../App.css";
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchWeatherData } from "../api";
import Header from "../components/Header";
import Weather from '../components/card/Weather';
import WaterTmp from '../components/card/WaterTmp';
import TideAndSun from "../components/card/TideAndSun";
import AutoSearch from "../components/AutoSearch";

const MainPage: React.FC = () => {
    const [beach, setBeach] = useState<string>('');
    
    const { data, isLoading, isError } = useQuery({
        queryKey: ['weather'], 
        queryFn: fetchWeatherData,
    });

    // 로딩중 상태 처리
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // 에러 상태 처리
    if (isError) {
        return <div>Error fetching data</div>;
    }

    // 데이터 가져옴
    return (
        <div 
            className="w-screen h-screen bg-cover" 
            style={{ backgroundImage: 'url(images/background.png)' }}
        >
            <Header showTitle={false} />

            <span className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl">
                Ocean Calendar
            </span>
            
            <div className="absolute flex w-4/5 justify-around top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-10">
                <Weather 
                    emoji={data?.emoji || ""} 
                    sky={data?.sky || ""} 
                    pty={data?.pty || ""} 
                    tmp={data?.tmp[0]?.fcstValue || ""}
                />
                <WaterTmp tmp={data?.tmp || []} />
                <TideAndSun />
            </div>

            <AutoSearch setBeach={setBeach} />
        </div>
    );
};

export default MainPage;