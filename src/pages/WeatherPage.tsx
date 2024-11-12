import Header from "../components/Header"
import Search from "../components/Search"

const WeatherPage: React.FC = () => {
    return (
        <div>
            <Header showTitle={false}/>
            <Search/>
        </div>
    )
}

export default WeatherPage