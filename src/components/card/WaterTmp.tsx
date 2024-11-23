import Graph from '../Graph';
import { useQuery } from '@tanstack/react-query';
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

    // tm 또는 tw 값이 모두 null인 경우를 확인
    const hasValidData = data && data.some(item => item.tm && item.tw);

    return (
        <div className=" bg-white opacity-65 w-[250px] h-[290px] rounded-3xl pt-8">
            {hasValidData ? <Graph tmp={data} /> : <div>제공안됨</div>}
        </div>
    )
}

export default WaterTmp