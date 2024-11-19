import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchWeatherData } from "../util/api";
import { processWeatherItems } from '../util/utils';
import Header from "../components/Header";
import Weather from '../components/card/Weather';
import WaterTmp from '../components/card/WaterTmp';
import TideAndSun from "../components/card/TideAndSun";
import AutoSearch from "../components/AutoSearch";
import { useBeachStore } from '../util/useStore';
import { beaches } from '../util/beachList';

const MainPage: React.FC = () => {
    const [beachNum, setBeachNum] = useState<number | null>(1);
    const { beach } = useBeachStore();

    const num = 150;
    const { data, isLoading, isError } = useQuery({
        queryKey: ['weather', beachNum], // beachNum 변경 시 API 호출 
        queryFn: () => fetchWeatherData(beachNum || 1),
        enabled: !!beachNum // beachNum이 있을 때만 실행
    });

    const beachNumUpdate = (beach: string) => {
        const selectedBeach = beaches.find(b => b.name === beach);
        if (selectedBeach) {
          setBeachNum(selectedBeach.num); // 선택된 해변의 num 업데이트
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching data</div>;
    }

    const { tmp, pty, sky, emoji } = processWeatherItems(data);

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
                    emoji={emoji || ""} 
                    sky={sky || ""} 
                    pty={pty || ""} 
                    tmp={tmp[0]?.fcstValue || ""}
                />
                <WaterTmp tmp={tmp || []} />
                <TideAndSun />
            </div>

            <AutoSearch containerStyle={{ top: '33%', left: '50%', transform: 'translate(-50%, -50%)'}} inputStyle={{ border: 'none'}} onSelectBeach={beachNumUpdate}/>
        </div>
    );
};

export default MainPage;
