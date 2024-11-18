import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Header from "../components/Header"
import Search from "../components/Search"
import { fetchWeatherData } from '../util/api'
import { beaches } from '../util/beachList'

const getBeachNum = (name: string): number | null => {
    const beach = beaches.find((b) => b.name === name);
    return beach ? beach.num : null;
}

const WeatherPage: React.FC = () => {
    const [beach, setBeach] = useState<string>('');
    const beachNum = getBeachNum(beach);

    // const { data, refetch } = useQuery({
    //     queryKey: ['weatherPage'], 
    //     queryFn: fetchWeatherData(beachNum),
    //     enabled: false
    // })

    // const handleFetchData = () => {
    //     if (beachNum !== null) {
    //         refetch();
    //     } else {
    //         alert("해수욕장을 선택하세요.");
    //     }
    // }

    return (
        <div>
            <Header showTitle={false}/>
            <Search 
                style={{padding: '30px'}} 
                beach={beach} 
                setBeach={setBeach}
                // handleFetchData={handleFetchData}
            />
            
        </div>
    )
}

export default WeatherPage