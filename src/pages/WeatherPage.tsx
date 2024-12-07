import Header from "../components/Header"
import Search from "../components/Search"
import Graphs from '../components/weather/Graphs'
import { useBeachStore } from "../util/useStore"

const WeatherPage: React.FC = () => {
    const { beachName } = useBeachStore();

    return (
        <div>
            <Header showTitle={false}/>
            <div className="m-[30px]">
                <Search/>
                <p className="text-sm mb-[25px] mt-[15px] text-zinc-600">
                    조회하고 싶은 날짜를 선택하세요. <br/>
                    어제와 오늘의 날씨 예보를 제공합니다.
                </p>
                <hr className="mt-[25px]"/>
                <p className="mt-[25px] mb-[15px]">
                    <span className="font-bold border-b-[1px] border-b-black">{beachName}</span>의 날씨 예보
                </p>
                <Graphs/>
            </div> 
        </div>
    )
}

export default WeatherPage