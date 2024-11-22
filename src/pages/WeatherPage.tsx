import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Header from "../components/Header"
import Search from "../components/Search"
import { fetchWeatherData } from '../util/api'
import TempGraph from '../components/weather/TempGraph'
import { useBeachStore } from '../util/useStore'
import { processWeatherItems } from '../util/apiUtils'


const WeatherPage: React.FC = () => {
    const [beach, setBeach] = useState<string>('');
    const { beachNum } = useBeachStore();

    const { data, refetch } = useQuery({
        queryKey: ['weatherPage'], 
        queryFn: () => fetchWeatherData(beachNum),
        enabled: false
    })
    
    const { tmp } = processWeatherItems(data);

    return (
        <div>
            <Header showTitle={false}/>
            <Search 
                style={{padding: '30px'}} 
                beach={beach} 
                setBeach={setBeach}
                // handleFetchData={handleFetchData}
            />
            {/* <TempGraph tmp={tmp}/> */}
            
        </div>
    )
}

export default WeatherPage