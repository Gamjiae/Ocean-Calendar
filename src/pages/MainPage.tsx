import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchWeatherData } from "../util/api";
import Header from "../components/Header";
import Weather from '../components/card/Weather';
import WaterTmp from '../components/card/WaterTmp';
import TideAndSun from "../components/card/TideAndSun";
import AutoSearch from "../components/AutoSearch";

const MainPage: React.FC = () => {
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
                <Weather/>
                <WaterTmp/>
                <TideAndSun/>
            </div>

            <AutoSearch 
                containerStyle={{ top: '33%', left: '50%', transform: 'translate(-50%, -50%)'}} 
                inputStyle={{ border: 'none'}}
            />
        </div>
    );
};

export default MainPage;