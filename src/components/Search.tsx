import { useEffect, useState } from 'react'
import AutoSearch from './AutoSearch'
import Calendar from './Calendar'
import BeachList from './BeachList'
import { WeatherData } from '../util/interface';

type Props = {
  style?: React.CSSProperties;
  data?: WeatherData;
  // handleFetchData: () => void;
};

const Search: React.FC<Props> = ({ style }) => {
  const [select, setSelect] = useState<string>('');

  return (
    <div style={style}>
      <div className="flex items-center">
        <span className="w-[100px] text-zinc-600 text-sm">해수욕장 선택</span>
        <div className='flex w-[191px] justify-around p-[5px] text-sm border-[2px]' style={{borderColor: '#a6cfe9'}}>
          <button onClick={() => setSelect('name')}>가나다</button>
          <div className='border-slate-400 border-r-[1px]'/>
          <button onClick={() => setSelect('map')}>지도</button>
          <div className='border-slate-400 border-r-[1px]'/>
          <button onClick={() => setSelect('search')}>검색</button>
        </div>
      </div>
      { select === 'name' && (
        <BeachList/>
      )}
      { select === 'map' && (
        '지도'
      )}
      { select === 'search' && (
        <AutoSearch
          containerStyle={{
            position: 'static',
            width: '190px',
            height: '30px',
            marginTop: '10px',
            marginBottom: '10px',
          }}
          showImg={false}
        />
      )}
      <div className="flex items-center mt-2">
        <span className="w-[100px] text-zinc-600 text-sm">날짜 선택</span>
        <Calendar />
      </div>
    </div>
  );
};

export default Search;