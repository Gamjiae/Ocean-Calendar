import Graph from '../Graph';
import { useQuery } from '@tanstack/react-query';
import { processWeatherItems } from '../../util/utils';
import { useBeachStore } from '../../util/useStore';
import { fetchWeatherData } from '../../util/api';

type ForecastData = {
    fcstTime: string;
    fcstValue: string;
}

type props = {
   tmp: ForecastData[]
}

const WaterTmp: React.FC = () => {
    const { beachNum } = useBeachStore();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['weather', beachNum], 
        queryFn: () => fetchWeatherData(beachNum || 1)
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching data</div>;
    }

    const { tmp } = processWeatherItems(data);

    return (
        <div className="flex items-center justify-center flex-col bg-white opacity-65 w-[250px] h-[290px] rounded-3xl">
            <Graph tmp={tmp}/>
        </div>
    )
}

export default WaterTmp