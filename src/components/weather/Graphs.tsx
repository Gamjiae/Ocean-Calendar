import { useQuery } from "@tanstack/react-query";
import { useBeachStore, useDateStore } from "../../util/useStore";
import TempGraph from "./TempGraph";
import { processWeatherItems } from "../../util/apiUtils";
import { Fcst } from "../../util/interface";
import { FetchWeatherData } from "../../util/api";

interface Props {
    tmp?: Fcst[]
}

const Graphs: React.FC<Props> = () => {
    const { beachNum } = useBeachStore();
    const { date } = useDateStore();

    const year = date.getFullYear(); 
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const selectedDate = `${year}${month}${day}`;

    const { data, isLoading, isError } = useQuery({
        queryKey: ['weatherPage', beachNum, selectedDate], 
        queryFn: () => FetchWeatherData(beachNum || 1, selectedDate)
    });
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching data</div>;
    }

    const { wsd, tmp, rn1 } = processWeatherItems(data);
    
    return (
        <div className="p-[30px] w-4/5 h-[300px]">
            <TempGraph fcstData={tmp} text='기온'/>
            <TempGraph fcstData={wsd} text='풍속'/>
            <TempGraph fcstData={rn1} text='강수량'/>
        </div>
    )
}

export default Graphs;