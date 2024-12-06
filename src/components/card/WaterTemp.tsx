import Graph from '../Graph';
import { useQueries } from '@tanstack/react-query';
import { useBeachStore, useDateStore } from '../../util/useStore';
import { fetchWaterTemp } from '../../util/api';
import { formatDateToYYYYMMDD } from '../../util/apiUtils';
import { generateLastThreeHours, generateTimes } from '../../util/dateUtils';

const WaterTmp: React.FC = () => {
    const { beachNum } = useBeachStore();
    const { date } = useDateStore();
    const { fullDate } = formatDateToYYYYMMDD(date);

    const times = generateLastThreeHours(date);
    
    const tempResults = useQueries({
        queries: times.map((time) => ({
            queryKey: ["waterTemp", beachNum, fullDate, time],
            queryFn: () => fetchWaterTemp(beachNum, fullDate, time),
            enabled: !!beachNum,
        })),
    });

    if (tempResults.some((result) => result.isLoading)) {
        return <div>Loading...</div>;
    }

    if (tempResults.some((result) => result.isError)) {
        return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
    }

    // 데이터가 유효한지 확인
    const data = tempResults.map(result => result.data).flat(); // 모든 데이터 병합
    const hasValidData = data.some(item => item.tm && item.tw);

    return (
        <div className="opacity-65 w-[250px] h-[290px] rounded-3xl pt-8 border-[2px] border-slate-300"
            style={{ backgroundColor: '#efeff9', border: '1px solid #d6d6e5', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            {hasValidData ? <Graph tmp={data} /> : <div>제공안됨</div>}
        </div>
    );
}

export default WaterTmp;
