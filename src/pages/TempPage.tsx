import { useBeachStore } from "../util/useStore"
import Header from "../components/Header"
import Search from "../components/Search"
import TempGraph from "../components/TempGraph";

const TempPage: React.FC = () => {
    const { beachName } = useBeachStore();

    return (
        <div>
            <Header />
            <div className="m-[30px]">
                <Search />
                <p className="text-sm mb-[25px] mt-[15px] text-zinc-600">
                    조회하고 싶은 날짜를 선택하세요. <br/>
                    선택한 날짜의 시간별 수온 정보를 제공합니다.
                </p>
                <hr className="mt-[25px]"/>
                <p className="mt-[25px]">
                    <span className="font-bold border-b-[1px] border-b-black">{beachName}</span>의 수온 정보
                </p>
                <TempGraph/>
            </div>
        </div>
    )

}

export default TempPage