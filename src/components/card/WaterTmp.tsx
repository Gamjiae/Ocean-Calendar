import Graph from '../Graph';
import { useQuery } from '@tanstack/react-query';
import { processWeatherItems } from '../../util/apiUtils';
import { useBeachStore } from '../../util/useStore';
import { fetchWaterTemp } from '../../util/api';

const WaterTmp: React.FC = () => {
    const { beachNum } = useBeachStore();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['waterTemp', beachNum], 
        queryFn: () => fetchWaterTemp(beachNum)
    });
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching data</div>;
    }

    return (
        <div className="flex items-center justify-center flex-col bg-white opacity-65 w-[250px] h-[290px] rounded-3xl">
            <Graph tmp={data}/>
        </div>
    )
}

export default WaterTmp