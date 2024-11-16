import React, { useEffect, useState } from 'react';
import AutoSearch from './AutoSearch';
import Calendar from './Calendar';
import BeachList from './BeachList';

type Props = {
  style?: React.CSSProperties;
};

const Search: React.FC<Props> = ({ style }) => {
  const [select, setSelect] = useState<string>('');
  const [beach, setBeach] = useState<string>('');

  return (
    <div style={style}>
      <div className="flex items-center">
        <span className="mr-2 text-zinc-600 text-sm">해수욕장 선택</span>
        <button 
          className='mr-5'
          onClick={() => setSelect('name')}>가나다</button>
        <button className='mr-5' onClick={() => setSelect('map')}>지도</button>
        <button onClick={() => setSelect('search')}>검색</button>
      </div>
      { select === 'name' && (
        <BeachList beach={beach} setBeach={setBeach} />
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
      <div className="flex items-center">
        <span className="mr-2 text-zinc-600 text-sm">날짜 선택</span>
        <Calendar />
      </div>
      <button className="bg-sky-500 text-white p-0.5 text-sm h-[25px]">
        결과 조회
      </button>
    </div>
  );
};

export default Search;