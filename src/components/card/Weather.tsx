import { useQuery } from '@tanstack/react-query';
import { processWeatherItems } from '../../util/apiUtils';
import { useBeachStore } from '../../util/useStore';
import { FetchWeatherData } from '../../util/api';
import {useEffect} from 'react'

const Weather: React.FC = () => {
    const { beachNum } = useBeachStore();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['weather', beachNum], 
        queryFn: () => FetchWeatherData(beachNum || 1)
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching data</div>;
    }

    const { tmp, pty, sky, emoji } = processWeatherItems(data);

    return (
        // 나중에 이거 다른 카드에도 적용하셈
        <div className="flex items-center justify-center flex-col bg-white opacity-65 w-[250px] h-[290px] rounded-3xl"> 
            <img className='w-[100px] mb-10' src={emoji} alt='Weather Emoji'/>
            <div className="text-lg font-medium">{tmp[0]?.fcstValue} ℃</div>
            <span className="text-gray-600 mt-5 text-sm">{pty}, {sky}</span>
        </div>
    )
}

export default Weather