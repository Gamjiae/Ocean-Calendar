import Header from "../components/Header";
import Weather from '../components/card/Weather';
import WaterTmp from '../components/card/WaterTemp';
import TideAndSun from "../components/card/TideAndSun";
import AutoSearch from "../components/AutoSearch";
import { useBeachStore } from "../util/useStore";
const MainPage: React.FC = () => {
    const { beachName } = useBeachStore();

    return (
        <div 
            className="w-screen h-screen bg-cover"
            style={{backgroundColor: '#F7F7FB'}} 
            // style={{ backgroundImage: 'url(images/background.png)' }}
        >
            <Header showTitle={false} />
            
            <span className="relative flex justify-center top-[80px] text-indigo-950 text-2xl">
                Ocean Calendar
            </span>
            
            <AutoSearch 
                containerStyle={{ top: '30%', left: '50%', transform: 'translate(-50%, -50%)'}} 
                inputStyle={{ border: '1px solid #D1D1E1'}}
            />

            <div className="relative flex justify-center top-[200px] font-light">
                <span className="font-normal">'{beachName}'</span>의 바다 기상 정보
            </div>

            <div className="relative flex w-4/5 justify-around top-[250px] left-1/2 transform -translate-x-1/2 -translate-y-10">
                <Weather/>
                <WaterTmp/>
                <TideAndSun/>
            </div>
        </div>
    );
};

export default MainPage;