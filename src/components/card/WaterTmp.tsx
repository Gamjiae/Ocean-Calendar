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
            <Graph tmp={tmp}/>
        </div>
    )
}

export default WaterTmp