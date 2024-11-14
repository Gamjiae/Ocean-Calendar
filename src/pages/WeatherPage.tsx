import Header from "../components/Header"
import Search from "../components/Search"

const WeatherPage: React.FC = () => {
    return (
        <div>
            <Header showTitle={false}/>
            <Search style={{padding: '30px'}}/>
            
        </div>
    )
}

export default WeatherPage