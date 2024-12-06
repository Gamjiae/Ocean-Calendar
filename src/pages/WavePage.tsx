import Header from "../components/Header"
import Search from "../components/Search"
import WaveTable from "../components/WaveTable"
import { useBeachStore } from "../util/useStore"

const WavePage: React.FC = () => {
    const { beachName } = useBeachStore();

    return (
        <div>
            <Header/>
            <div className="m-[30px]">
                <Search/>
                <p className="text-sm mb-[25px] mt-[15px] text-zinc-600">
                    조회하고 싶은 날짜를 선택하세요. <br/>
                    단, 과거의 파고 정보만 조회 가능합니다.
                </p>
                
                <hr className="mt-[25px]"/>
                <p className="mt-[25px] mb-[15px]">
                    <span className="font-bold border-b-[1px] border-b-black">{beachName}</span>의 파고 정보
                </p>
                <WaveTable/>
            </div> 
        </div>
    )
}

export default WavePage