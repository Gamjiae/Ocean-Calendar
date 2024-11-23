import Header from "../components/Header"
import Search from "../components/Search"
import Graphs from '../components/weather/Graphs'
import { useBeachStore } from "../util/useStore"

const WeatherPage: React.FC = () => {
    const { beachName } = useBeachStore();

    return (
        <div className=''>
            <Header showTitle={false}/>
            <Search 
                style={{padding: '30px'}}
            />
            <p className="ml-[30px]">
                <span className="font-bold border-b-[1px] border-b-black">{beachName}</span>의 날씨 예보
            </p>
            <Graphs/> 
        </div>
    )
}

export default WeatherPage