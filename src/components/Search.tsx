import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AutoSearch from './AutoSearch';
import Calendar from './Calendar';

type Beach = {
  name: string;
  lat: number;
  lng: number;
};

type Props = {
  style?: React.CSSProperties;
};

const Search: React.FC<Props> = ({ style }) => {
  const [beaches, setBeaches] = useState<Beach[]>([]);
  const [selectedBeach, setSelectedBeach] = useState<string>('');

  // 컴포넌트가 마운트될 때 API 호출
  useEffect(() => {
    const fetchBeaches = async () => {
      try {
        const response = await axios.get('/api/beaches');
        setBeaches(response.data);
      } catch (error) {
        console.error('해수욕장 데이터를 가져오는 데 실패했습니다:', error);
      }
    };
    fetchBeaches();
  }, []);

  return (
    <div style={style}>
      <div className="flex items-center">
        <span className="mr-2 text-zinc-600 text-sm">지역 선택</span>
        <select className="border-[2px]">
          <option>서울시</option>
        </select>
        <select className="border-[2px] ml-5">
          <option>강서구</option>
        </select>
      </div>
      <div className="flex items-center">
        <span className="mr-2 text-zinc-600 text-sm">해수욕장 선택</span>
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
      </div>
      <div className="flex items-center">
        <span className="mr-2 text-zinc-600 text-sm">날짜 선택</span>
        <Calendar />
        <button className="bg-sky-500 text-white p-0.5 text-sm h-[25px] ml-[50px]">
          결과 조회
        </button>
      </div>
    </div>
  );
};

export default Search;