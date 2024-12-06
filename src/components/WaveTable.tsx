import { useQueries } from "@tanstack/react-query";
import { fetchWaveHeight } from "../util/api";
import { formatDateToYYYYMMDD, getTimeArray } from "../util/apiUtils";
import { useBeachStore, useDateStore } from "../util/useStore";
import '../style/table.css';

const WaveTable: React.FC = () => {
    const { beachNum } = useBeachStore();
    const { date } = useDateStore();

    // 날짜를 YYYYMMDD 형식으로 변환
    const { year, month, day } = formatDateToYYYYMMDD(date);

    // 현재 날짜 가져오기
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = String(today.getMonth() + 1).padStart(2, "0");
    const currentDay = String(today.getDate()).padStart(2, "0");

    // today를 YYYYMMDD 형식의 문자열로 변환
    const formattedToday = `${currentYear}${currentMonth}${currentDay}`;

    // 사용자가 선택한 날짜를 YYYYMMDD 형식으로 변환
    const selectedDate = `${String(date.getFullYear()).padStart(4, "0")}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;

    // 선택한 날짜가 오늘인지 과거인지 확인
    const isToday = selectedDate === formattedToday;

    // 시간을 가져오는 함수 (00시부터 현재시간까지)
    const times = isToday ? getTimeArray() : Array.from({ length: 24 }, (_, index) => String(index).padStart(2, "0"));
    console.log('times:', times);

    // 쿼리 설정 (시간에 따라 00시부터 현재 시간까지 호출 or 00시부터 23시까지 호출)
    const waveResults = useQueries({
        queries: times.map((time) => {
            // 오늘 날짜일 경우, 해당 날짜와 시간으로 조회
            const formattedSearchTime = `${selectedDate}${String(time).padStart(2, '0')}`;

            return {
                queryKey: ['HighAndLowTide', beachNum, formattedSearchTime, time], // 고유한 쿼리 키로 사용
                queryFn: () => fetchWaveHeight(beachNum, formattedSearchTime),
            };
        })
    });

    // 로딩 중일 때
    if (waveResults.some(item => item.isLoading)) {
        return <div>Loading...</div>;
    }

    // 에러 발생 시
    if (waveResults.some(item => item.isError)) {
        return <div>Error Fetching data</div>;
    }

    // 데이터 처리
    const datas = waveResults.map(item => {
        return {
            ...item.data,
            tm: item.data.tm.slice(8, 10),  // 시간을 잘라서 표시
        };
    });

    console.log('datas:', datas);

    return (
        <table className="wave-table">
            <thead>
                <tr>
                    <th>{year}년 {month}월 {day}일</th>
                    <th>파고</th>
                </tr>
            </thead>
            <tbody>
                {datas.map((data, index) => (
                    <tr key={index}>
                        <td>{data.tm} 시</td>
                        <td>{data.wh}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default WaveTable;
