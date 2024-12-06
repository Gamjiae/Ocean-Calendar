import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { processWeatherItems } from '../../util/apiUtils';
import { useBeachStore } from '../../util/useStore';
import { FetchWeatherData } from '../../util/api';
import { date } from '../../util/getDate';

const Weather: React.FC = () => {
    const { beachNum } = useBeachStore();
    const navigate = useNavigate();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['weather', beachNum], 
        queryFn: () => FetchWeatherData(beachNum || 1, date)
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching data</div>;
    }

    const { tmp, pty, sky, emoji } = processWeatherItems(data);

    return (
        <div 
            className="flex items-center justify-center flex-col opacity-65 w-[250px] h-[290px] rounded-3xl cursor-pointer"
            style={{backgroundColor: '#efeff9', border: '1px solid #d6d6e5', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}
            onClick={() => navigate('/weather')}
        > 
            <img className='w-[100px] mb-10' src={emoji} alt='Weather Emoji'/>
            <div 
                className="text-lg font-medium"
                style={{color: '#1E1B4B'}}>
                    {tmp[0]?.fcstValue} ℃
            </div>
            <span className="text-gray-600 mt-5 text-sm">{pty}, {sky}</span>
        </div>
    )
}

export default Weather