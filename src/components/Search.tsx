import { beaches } from "../beachList"
import AutoSearch from "./AutoSearch"

const Search: React.FC = () => {
    return(
        <div>
            <div className="flex">
                <span className="mr-2">지역 선택</span>
                <AutoSearch 
                    containerStyle={{ position: 'static', width: '100%', height: '25px' }}
                    inputStyle={{ border: '2px solid #0EA5E9' }}
                    showImg={false}
                />
                <button className="bg-sky-500 text-white p-0.5 text-sm h-[25px] ml-2">결과 조회</button>
            </div>
            <div>
                <span>날짜 선택</span>
                
            </div>
        </div>
    )
}

export default Search