import Graph from '../Graph';

type ForecastData = {
    fcstTime: string;
    fcstValue: string;
}

type props = {
   tmp: ForecastData[]
}

const WaterTmp: React.FC<props> = ({ tmp }) => {
    return (
        <div className="flex items-center justify-center flex-col bg-white opacity-65 w-[250px] h-[290px] rounded-3xl">
            {/* 3시간 동안의 수온변화 그래프 */}
            <Graph tmp={tmp}/>
            <span className="text-gray-600">비, 구름 많음</span>
        </div>
    )
}

export default WaterTmp