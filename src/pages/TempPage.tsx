import { useQuery } from "@tanstack/react-query";
import { useBeachStore } from "../util/useStore"
import { fetchWaterTemp } from "../util/api";
import Header from "../components/Header"
import Search from "../components/Search"
import Graph from "../components/Graph";

const TempPage: React.FC = () => {
    const { beachName, beachNum } = useBeachStore();
    
    const { data, isLoading, isError } = useQuery({
        queryKey: ['waterTempPage', beachNum],
        queryFn: () => fetchWaterTemp(beachNum, true)
    })

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching data</div>;
    }

    const morningData = data.filter(item => parseInt(item.tm.slice(8, 10), 10) < 12);
    const afternoonData = data.filter(item => parseInt(item.tm.slice(8, 10), 10) >= 12);

    // tm 또는 tw 값이 모두 null인 경우를 확인
    const hasValidData = data && data.some(item => item.tm && item.tw);

    return (
        <div>
            <Header />
            <div className="m-[30px]">
                <Search />
                <hr className="mt-[25px]"/>
                <p className="mt-[25px]">
                    <span className="font-bold border-b-[1px] border-b-black">{beachName}</span>의 날씨 예보
                </p>
                { hasValidData ? 
                    <div className="mt-[15px] w-4/5 h-[300px]">
                        <Graph tmp={morningData} text='오전'/>
                        <Graph tmp={afternoonData} text='오후'/>
                    </div> 
                    : <div className="mt-[15px]">해당 해수욕장은 수온 정보를 제공하지 않습니다.</div>
                }
            </div>
        </div>
    )

}

export default TempPage