import { formatDateToYYYYMMDD, getWeekDates } from "../util/apiUtils";
import { useDateStore } from "../util/useStore";
import { useQueries } from "@tanstack/react-query";
import { useBeachStore } from "../util/useStore";
import { fetchHighAndLowTide, fetchLunarAge } from "../util/api";
import { datas } from '../util/mapping';
import { TideData } from "../util/interface";
import '../table.css';
import React from "react";

const TideTable: React.FC = () => {
    const { date } = useDateStore();
    const newDate = formatDateToYYYYMMDD(date);

    const { beachName } = useBeachStore();
    const stationId = datas[beachName];

    const weekDate = getWeekDates(date);
    console.log(weekDate);
    
    const tideResults = useQueries({
        queries: weekDate.map((date) => {
            return {
                queryKey: ['tide', stationId, date],
                queryFn: () => fetchHighAndLowTide(stationId, date),
                enabled: !!stationId,
            }
        })
    });

    const lunarResults = useQueries({
        queries: weekDate.map((date) => {
            return {
                queryKey: ['lunarAge', date],
                queryFn: () => fetchLunarAge(date),
                enabled: !!date,
            }
        })
    });

    console.log(lunarResults);

    if (lunarResults.some(item => item.isLoading) || tideResults.some(item => item.isLoading)) {
        return <div>Loading...</div>;
    }

    if (lunarResults.some(item => item.isError) || tideResults.some(item => item.isError)) {
        return <div>Error Fetching data</div>;
    }

    const combinedData = weekDate.map((date, dayIndex) => {
        const lunarAge = lunarResults[dayIndex]?.data?.lunAge; // 월령 값
        const tideData = tideResults[dayIndex]?.data || []; // 해당 날짜의 조수 데이터

        return tideData.map((tideItem: TideData) => ({
            ...tideItem,
            lunarAge, // 각 조수 데이터에 월령 값 추가
        }));
    });

    console.log(combinedData);

    return (
        <div className="pr-[400px]">
            <table>
                <thead>
                    <tr>
                        <th>{newDate.slice(0, 4)}년 {newDate.slice(4, 6)}월</th>
                        <th>월령</th>
                        <th>간조 / 만조 시각</th>
                        <th>수위</th>
                        <th>일출</th>
                        <th>일몰</th>
                    </tr>
                </thead>
                <tbody>
                    {combinedData.map((dayData, dayIndex) => (
                        <React.Fragment key={dayIndex}>
                            {dayData.map((item, index) => {
                                const isLastRow = index === dayData.length - 1;
                                return (
                                    <tr key={`${dayIndex}-${index}`}>
                                        <td style={{ borderBottom: isLastRow ? '1px solid #172554' : undefined }}>
                                            {item.tph_time.slice(5, 7)}월 {item.tph_time.slice(8, 10)}일
                                        </td>
                                        <td style={{ borderBottom: isLastRow ? '1px solid #172554' : undefined }}>
                                            {item.lunarAge} {/* 월령 값 표시 */}
                                        </td>
                                        <td style={{ borderBottom: isLastRow ? '1px solid #172554' : undefined }}>
                                            {item.tph_time.slice(11, 16)}
                                        </td>
                                        <td style={{ borderBottom: isLastRow ? '1px solid #172554' : undefined }}>
                                            {item.tph_level}
                                        </td>
                                        <td style={{ borderBottom: isLastRow ? '1px solid #172554' : undefined }}>05:28</td>
                                        <td style={{ borderBottom: isLastRow ? '1px solid #172554' : undefined }}>19:30</td>
                                    </tr>
                                );
                            })}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TideTable;
