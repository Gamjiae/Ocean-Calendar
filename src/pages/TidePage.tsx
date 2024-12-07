import Header from "../components/Header"
import Search from "../components/Search"
import TideTable from "../components/TideTable"
import { useBeachStore } from "../util/useStore"

const TidePage: React.FC = () => {
    const { beachName } = useBeachStore();

    return (
        <div>
            <Header/>            
            <div className="p-[30px]">
                <Search/>
                <p className="text-sm mb-[25px] mt-[15px] text-zinc-600">
                    조회하고 싶은 날짜를 선택하세요. <br/>
                    선택한 날짜를 기준으로 해당 주간의 조석 정보를 제공합니다.
                </p>
                <hr className="mt-[25px]"/>
                <p className="mt-[15px] mb-[15px]">
                    <span className="font-bold border-b-[1px] border-b-black">{beachName}</span>의 조석 정보
                </p>
                <TideTable/>
            </div>
        </div>
    )
}

export default TidePage