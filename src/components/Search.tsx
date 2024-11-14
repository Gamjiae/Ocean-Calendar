import AutoSearch from "./AutoSearch"
import Calendar from "./Calendar";

type props = {
    style?: React.CSSProperties;
}

const Search: React.FC<props> = ({ style }) => {
    return(
        <div style={style}>
            <div className="flex items-center">
                <span className="mr-2 text-zinc-600 text-sm">지역 선택</span>
                <AutoSearch 
                    containerStyle={{ position: 'static', width: '190px', height: '30px' }}
                    showImg={false}
                />
                <button className="bg-sky-500 text-white p-0.5 text-sm h-[25px] ml-2">결과 조회</button>
            </div>
            <div className="flex items-center">
                <span className="mr-2 text-zinc-600 text-sm">날짜 선택</span>
                <Calendar />
            </div>
        </div>
    )
}

export default Search