import { formatDateToYYYYMMDD, getWeekDates } from "../util/apiUtils";
import { useDateStore } from "../util/useStore";
import { useQueries } from "@tanstack/react-query";
import { useBeachStore } from "../util/useStore";
import { fetchHighAndLowTide } from "../util/api";
import { datas } from '../util/mapping';
import { TideData } from "../util/interface";
import '../table.css';

const TideTable: React.FC = () => {
    const { date } = useDateStore();
    const newDate = formatDateToYYYYMMDD(date);

    const { beachName } = useBeachStore();
    const stationId = datas[beachName];

    const weekDate = getWeekDates(date);
    console.log(weekDate);
    
    const results = useQueries({
        queries: weekDate.map((date) => {
            return {
                queryKey: ['tidePage', stationId, date],
                queryFn: () => fetchHighAndLowTide(stationId, date),
                enabled: !!stationId,
            }
        })
    });

    console.log(results);

    if (results.some(item => item.isLoading)) {
        return <div>Loading...</div>
    }

    if (results.some(item => item.isError)) {
        return <div>Error Fetching data</div>
    }

    const newData = results.map((result) => {
        return result.data ? result.data.map((item: TideData) => ({
            ...item
        })) : [];
    });

    console.log(newData);

    return (
        <div className="">
            <table className="">
                <thead>
                    <tr>
                        <th>{newDate.slice(0,4)}년 {newDate.slice(4,6)}월</th>
                        <th>월령</th>
                        <th>간조 / 만조 시각</th>
                        <th>수위</th>
                        <th>일출</th>
                        <th>일몰</th>
                    </tr>
                </thead>
                <tbody>
                    {newData.map((dayData, dayIndex) => (
                        <>
                            {dayData.map((item: TideData, index) => (
                                <tr key={`${dayIndex}-${index}`}>
                                    <td>{item.tph_time.slice(5, 7)}월 {item.tph_time.slice(8, 10)}일</td>
                                    <td>O</td>
                                    <td>{item.tph_time.slice(11, 16)}</td>
                                    <td>{item.tph_level}</td>
                                    <td>05:28</td>
                                    <td>19:30</td>
                                </tr>
                            ))}
                            {dayIndex < newData.length - 1 && <tr><td colSpan={6}><hr /></td></tr>}
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TideTable;
