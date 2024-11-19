import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { beaches } from '../util/beachList';
import { useBeachStore } from '../util/useStore';
import { AutoSearchProps, AutoDatas } from '../util/interface';

const AutoSearch: React.FC<AutoSearchProps> = ({ containerStyle, inputStyle, showImg = true }) => {  
  const [keyword, setKeyword] = useState<string>("");          // 검색어
  const [autoItems, setAutoItems] = useState<AutoDatas[]>([]); // 자동완성된 검색어 목록
  const [index, setIndex] = useState<number>(-1);
  const { setBeach } = useBeachStore();

  const autoRef = useRef<HTMLUListElement>(null);

  const onChangeData = (e: React.FormEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };

  const updateData = () => {
    const filteredBeaches = beaches
      .filter((beach) => beach.name.includes(keyword))
      .slice(0, 10);  // 최대 10개 결과로 제한
    setAutoItems(filteredBeaches);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if(keyword) updateData();
    }, 200);

    return () => clearTimeout(debounce);
  }, [keyword]);


  const handleKeyArrow = (e:React.KeyboardEvent) => {
    if (autoItems.length > 0) {
      switch (e.key) {
        case "ArrowDown": //키보드 아래 키
          setIndex(index + 1);
          if (autoRef.current?.childElementCount === index + 1) setIndex(0);
          break;
        case "ArrowUp": //키보드 위에 키
          setIndex(index - 1);
          if (index <= 0) {
            setAutoItems([]);
            setIndex(-1);
          }
          break;
        case "Escape": // esc key를 눌렀을때,
          setAutoItems([]);
          setIndex(-1);
          break;
      }  
    } 
  }

  const hasResults = autoItems.length > 0;

  return (
    <div>
      <SearchContainer style={containerStyle}>
        <SearchInput 
          value={keyword} 
          onChange={onChangeData} 
          hasResults={hasResults} 
          onKeyDown={handleKeyArrow}
          style={inputStyle}
          placeholder='해변 이름을 검색하세요.'
        />
        {showImg && 
          <img 
            src="images/search.png" 
            alt="searchIcon" 
            className="cursor-pointer"
          />}
        {hasResults && keyword && (
          <AutoSearchContainer hasResults={hasResults}>
            <ul ref={autoRef}>
              {autoItems.map((item, idx) => (
                <AutoSearchData 
                  key={item.num} 
                  onClick={() => {setKeyword(item.name); setBeach(item.name, item.num)}} 
                  isFocus={index === idx ? true : false}
                >
                  <span>{item.name}</span>
                </AutoSearchData>
              ))}
            </ul>
          </AutoSearchContainer>
        )}
      </SearchContainer>
    </div>
  );
}

interface SearchInputProps {
  hasResults: boolean;
}

const SearchContainer = styled.div`
  width: 60%;
  height: 45px;
  position: absolute;
  img {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 30px;
    height: 30px;
  }
`;

const SearchInput = styled.input<SearchInputProps>`
  padding-left: 20px;
  background-color: white;
  width: 100%;
  height: 100%;
  border-radius: ${({ hasResults }) => (hasResults ? '15px 15px 0 0' : '15px')};
  box-shadow: ${({ hasResults }) => (hasResults ? '0px 5px 10px 1px rgba(0, 0, 0, 0.1)' : 'none')};
  border: ${({ hasResults }) => (hasResults ? '2px solid #e4e4e7' : '2px solid #0EA5E9')}; // 수정된 부분

`;

const AutoSearchContainer = styled.div<SearchInputProps>`
  position: relative;
  height: auto;
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: ${({ hasResults }) => (hasResults ? '0px 5px 10px 1px rgba(0, 0, 0, 0.35)' : 'none')};
  border-radius: 0 0 15px 15px;
  z-index: 2;
`;

const AutoSearchData = styled.li<{isFocus?: boolean}>`
  padding: 8px 0px;
  width: 100%;
  font-size: 14px;
  background-color: ${props => props.isFocus ? "#edf5f5" : "#fff"};
  &:hover {
    background-color: #edf5f5;
    cursor: pointer;
  }
  position: relative;
  img {
    position: absolute;
    right: 5px;
    width: 18px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export default AutoSearch;