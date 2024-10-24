import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { beaches } from '../beachList';

type props = {
  setBeach: React.Dispatch<React.SetStateAction<string>>
}

const AutoSearch: React.FC<props> = ({ setBeach }) => {  
  const [keyword, setKeyword] = useState<string>("");     // 검색어
  const [autoItems, setAutoItems] = useState<string[]>([]); // 자동완성된 검색어 목록

  const onChangeData = (e: React.FormEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  }
  
  // 자동완성 만들기
  const updateData = () => {
    let filteredBeaches = beaches.filter((beach) => 
      beach.includes(keyword)
    ).slice(0, 10);  // 최대 10개 결과로 제한
    setAutoItems(filteredBeaches);
  }

  // 200ms 동안 멈춘 후 데이터를 업데이트함
  useEffect(() => {
    const debounce = setTimeout(() => {
      if(keyword) updateData();
    }, 200)

    return () => {
      clearTimeout(debounce)
    }
  }, [keyword])  

  return (
    <div>
      <SearchContainer>
        <SearchInput value={keyword} onChange={onChangeData} hasResults={autoItems.length > 0}/>
        <img src="images/search.png" alt="searchIcon" />
        {autoItems.length > 0 && keyword && (
          <AutoSearchContainer hasResults={autoItems.length > 0}>
            <ul>
              {autoItems.map((item, idx) => (
                <AutoSearchData key={item} onClick={() => setKeyword(item)}>
                  <span onClick={() => setBeach(item)}>{item}</span>
                </AutoSearchData>
              ))}
            </ul>
          </AutoSearchContainer>
        )}
      </SearchContainer>
    </div>
  )
}

interface SearchInputProps {
  hasResults: boolean;
}

const SearchContainer = styled.div`
  width: 60%;
  height: 45px;
  position: absolute;
  top: 33%;
  left: 50%;
  transform: translate(-50%, -50%);
  img {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 30px;
    height: 30px;
  }
`

const SearchInput = styled.input<SearchInputProps>`
  padding-left: 20px;
  background-color: white;
  width: 100%;
  height: 100%;
  border-radius: ${({ hasResults }) => (hasResults ? '15px 15px 0 0' : '15px')};
  box-shadow: ${({ hasResults }) => (hasResults ? '0px 5px 10px 1px rgba(0, 0, 0, 0.1)' : 'none')};
`

const AutoSearchContainer = styled.div<SearchInputProps>`
  height: auto;
  width: 100%;
  background-color: #fff;
  position: absolute;
  top: 45px;
  padding: 20px;
  box-shadow: ${({ hasResults }) => (hasResults ? '0px 5px 10px 1px rgba(0, 0, 0, 0.35)' : 'none')};
  border-radius: 0 0 15px 15px;
`

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
`

export default AutoSearch