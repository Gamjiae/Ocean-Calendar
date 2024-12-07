import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchHighAndLowTide } from '../../util/api'
import { TideData } from '../../util/interface'
import { datas } from '../../util/mapping'
import { useBeachStore } from '../../util/useStore'

const TideAndSun: React.FC = () => { 
    const navigate = useNavigate();
    
    const { beachName } = useBeachStore();
    const stationId = datas[beachName];

    const { data, isLoading, isError } = useQuery({
        queryKey: ['HighAndLowTide', stationId], 
        queryFn: () => fetchHighAndLowTide(stationId),
        enabled: !!stationId,
    });

    const highTide = data?.filter((item: TideData) => item.hl_code === '고조') || [];
    const lowTide = data?.filter((item: TideData) => item.hl_code === '저조') || [];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching data</div>;
    }
    
    return (
        <div 
            className='relative opacity-65 w-[250px] h-[290px] rounded-3xl border-[2px] border-slate-300 cursor-pointer'
            style={{backgroundColor: '#efeff9', border: '1px solid #d6d6e5', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}
            onClick={() => navigate('/tide')}
        >
            <div className='mt-3 flex justify-center'>
                <div className='inline px-2 text-indigo-900 text-sm rounded-md bg-indigo-200'>조석 예보</div>
            </div>

            <img 
                src='images/arrow.png'
                className='absolute w-10 top-0 right-0'
            />

            <div className="pt-[50px] flex items-center justify-center flex-col">
                {/* 조석 */}
                {highTide?.map((item: TideData, index: number) => (
                    <div className='w-full flex px-12 justify-between mt-0' key={index} style={{color: '#1E1B4B'}}>
                        {item.tph_time.slice(11,16)}
                        <div className='flex items-center'>
                            <img className="w-3 h-4" src='images/up.png'/>
                            {item.tph_level}
                        </div>
                    </div>
                ))} <hr className="my-2 border-t-1 border-gray-400 w-4/5" />
                
                {lowTide?.map((item: TideData, index: number) => (
                    <div className='w-full flex px-12 justify-between' key={index} style={{color: '#1E1B4B'}}>
                        {item.tph_time.slice(11,16)} 
                        <div className='flex items-center'>
                            <img className="w-3 h-4" src='images/down.png'/>
                            {item.tph_level}
                        </div>
                    </div>
                ))} <br/>          

                {/* 일출, 일몰 */}
                <div className="flex justify-between text-sm bottom-2">
                    <div className="flex">
                        <img
                            className="w-7 h-5 mr-1" 
                            src="images/sunrise.png"
                        />
                        <span>05 : 21</span>
                    </div>
                    <div className="flex">
                        <img
                            className="w-7 h-5 mr-1" 
                            src="images/sunset.png"
                        />
                        <span>19 : 40</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TideAndSun