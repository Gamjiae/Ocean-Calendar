import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { beaches } from '../util/beachList';
import { useBeachStore } from '../util/useStore';
import { AutoSearchProps, AutoDatas } from '../util/interface';

const AutoSearch: React.FC<AutoSearchProps> = ({ containerStyle, inputStyle, showImg = true }) => {  
  const [keyword, setKeyword] = useState<string>("");          // 검색어
  const [autoItems, setAutoItems] = useState<AutoDatas[]>([]); // 자동완성된 검색어 목록
  const [index, setIndex] = useState<number>(-1);
  const [isListOpen, setIsListOpen] = useState<boolean>(false);
  const { setBeach } = useBeachStore();

  const autoRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const onChangeData = (e: React.FormEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
    setIsListOpen(true);

    if (e.currentTarget.value === "") {
      setAutoItems([]); // 검색어가 비어있으면 자동완성 목록을 비웁니다.
      setIsListOpen(false); // 리스트를 닫습니다.
    }
  };

  const updateData = () => {
    const filteredBeaches = beaches
      .filter((beach) => beach.name.includes(keyword))
      .slice(0, 10);  // 최대 10개 결과로 제한

    // 중복 데이터 업데이트 방지
    if (
      filteredBeaches.length === autoItems.length &&
      filteredBeaches.every((item, idx) => item.name === autoItems[idx].name)
    ) {
      return;
    }
    setAutoItems(filteredBeaches);
    console.log('autoItems:', autoItems);
    console.log('keyword:', keyword);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if(keyword) updateData();
    }, 200);
    
    return () => clearTimeout(debounce);
  }, [keyword]);

  // 키보드로 자동 완성 단어 조작
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

  // 영역 밖 클릭시 자동완성창 닫음
  const handleClickOutside = (e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setIsListOpen(false);
      console.log('AutoItems:', autoItems);
      console.log('Keyword:', keyword);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  const onFocusInput = () => {
    if (keyword.trim()) {
      updateData(); // keyword에 따라 autoItems를 다시 업데이트
    }
  };

  return (
    <div ref={containerRef}>
      <SearchContainer style={containerStyle}>
        <SearchInput 
          value={keyword} 
          onChange={onChangeData} 
          isListOpen={isListOpen} 
          onKeyDown={handleKeyArrow}
          style={inputStyle}
          placeholder='해변 이름을 검색하세요.'
        />
        {showImg && 
          <img 
            src="images/search.png" 
            alt="searchIcon" 
            className="cursor-pointer"
            style={{marginBottom: '5px'}}
          />}
        {isListOpen && keyword && (
          <AutoSearchContainer isListOpen={isListOpen}>
            <ul ref={autoRef}>
              {autoItems.map((item, idx) => (
                <AutoSearchData 
                  key={item.num} 
                  onClick={() => {setKeyword(item.name); setBeach(item.name, item.num); setIsListOpen(false);}} 
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
  isListOpen: boolean;
}

const SearchContainer = styled.div`
  width: 60%;
  height: 45px;
  position: absolute;
  img {
    position: absolute;
    right: 10px;
    top: 9px;
    width: 27px;
    height: 27px;
  }
`;

const SearchInput = styled.input<SearchInputProps>`
  padding-left: 20px;
  background-color: white;
  width: 100%;
  height: 100%;
  border-radius: ${({ isListOpen }) => (isListOpen ? '15px 15px 0 0' : '15px')};
  box-shadow: ${({ isListOpen }) => (isListOpen ? '0px 5px 10px 1px rgba(0, 0, 0, 0.1)' : 'none')};
  border: ${({ isListOpen }) => (isListOpen ? '2px solid #e4e4e7' : '2px solid #0EA5E9')};
  &:focus {
    outline: none;
  }
`;

const AutoSearchContainer = styled.div<SearchInputProps>`
  position: relative;
  height: auto;
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: ${({ isListOpen }) => (isListOpen ? '0px 5px 10px 1px rgba(0, 0, 0, 0.35)' : 'none')};
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
    width: 15px;
    top: 50%;
    transform: translateY(-50%);
    margin-bottom: 1px;
  }
`;

export default AutoSearch;