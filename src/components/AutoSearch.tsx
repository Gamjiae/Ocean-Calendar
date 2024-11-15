import { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { beaches } from '../util/beachList';

type Props = {
  setBeach?: React.Dispatch<React.SetStateAction<string>>;
  containerStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  showImg?: boolean;
}

const AutoSearch: React.FC<Props> = ({ setBeach, containerStyle, inputStyle, showImg = true }) => {  
  const [keyword, setKeyword] = useState<string>("");     // 검색어
  const [autoItems, setAutoItems] = useState<string[]>([]); // 자동완성된 검색어 목록

  const onChangeData = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  }, []);

  const handleSelectItem = useCallback((item: string) => {
    setKeyword(item);
    if (setBeach) setBeach(item);
  }, [setBeach]);

  const updateData = useCallback(() => {
    const filteredBeaches = beaches.filter((beach) => 
      beach.includes(keyword)
    ).slice(0, 10);  // 최대 10개 결과로 제한
    setAutoItems(filteredBeaches);
  }, [keyword]);

  useEffect(() => {
    if (!keyword) return setAutoItems([]);
    
    const debounce = setTimeout(() => {
      updateData();
    }, 200);

    return () => clearTimeout(debounce);
  }, [keyword, updateData]);

  const hasResults = autoItems.length > 0;

  return (
    <div>
      <SearchContainer style={containerStyle}>
        <SearchInput 
          value={keyword} 
          onChange={onChangeData} 
          hasResults={hasResults} 
          style={inputStyle}
        />
        {showImg && <img src="images/search.png" alt="searchIcon" />}
        {hasResults && keyword && (
          <AutoSearchContainer hasResults={hasResults}>
            <ul>
              {autoItems.map((item) => (
                <AutoSearchData key={item} onClick={() => handleSelectItem(item)}>
                  <span>{item}</span>
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

const AutoSearchData = styled.li`
  padding: 8px 0px;
  width: 100%;
  font-size: 14px;
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
