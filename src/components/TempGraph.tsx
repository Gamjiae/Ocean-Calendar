import { useQueries } from "@tanstack/react-query";
import { fetchWaterTemp } from "../util/api";
import { useBeachStore, useDateStore } from "../util/useStore";
import { generateTimes } from "../util/dateUtils";
import { splitMorningAfternoon } from "../util/tempUtils";
import Graph from "./Graph";
import { formatDateToYYYYMMDD } from "../util/apiUtils";

const TempGraph: React.FC = () => {
    const { beachNum } = useBeachStore();
    const { date } = useDateStore();

    const currentDate = new Date(); // 현재 시간
    const { fullDate } = formatDateToYYYYMMDD(date) // 날짜 포맷
    const times = generateTimes(date, currentDate); // 호출 가능한 시간 목록

    // API 호출
    const tempResults = useQueries({
        queries: times.map((time) => ({
            queryKey: ["waterTemp", beachNum, fullDate, time],
            queryFn: () => fetchWaterTemp(beachNum, fullDate, time),
            enabled: !!beachNum,
        })),
    });

    if (tempResults.some((result) => result.isLoading)) {
        return <div>Loading...</div>;
    }

    if (tempResults.some((result) => result.isError)) {
        return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
    }

    // 데이터 분리
    const { morningData, afternoonData } = splitMorningAfternoon(tempResults, times);

    const hasMorningData = morningData.length > 0;
    const hasAfternoonData = afternoonData.length > 0;

    return (
        <div className="mt-[15px] w-4/5 h-[300px]">
            {hasMorningData && <Graph tmp={morningData} text="오전" />}
            {hasAfternoonData && <Graph tmp={afternoonData} text="오후" />}
        </div>
    );
};

export default TempGraph;