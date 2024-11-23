import { useQuery } from '@tanstack/react-query'
import Header from "../components/Header"
import Search from "../components/Search"
import { FetchWeatherData } from '../util/api'
import { useBeachStore, useDateStore } from '../util/useStore'
import { processWeatherItems } from '../util/apiUtils'
import Graphs from '../components/weather/Graphs'


const WeatherPage: React.FC = () => {
    const { beachNum } = useBeachStore();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['weatherPage', beachNum], 
        queryFn: () => FetchWeatherData(beachNum || 1)
    });
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching data</div>;
    }

    const { wsd } = processWeatherItems(data);
    console.log(wsd);
    const { tmp } = processWeatherItems(data);

    return (
        <div className=''>
            <Header showTitle={false}/>
            <Search 
                style={{padding: '30px'}}
                // handleFetchData={handleFetchData}
            />
            <Graphs tmp={tmp}/> 
        </div>
    )
}

export default WeatherPage