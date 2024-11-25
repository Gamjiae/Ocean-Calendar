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