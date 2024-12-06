import { UseQueryResult } from "@tanstack/react-query";
import { WaterTempItem } from "./interface";

export const splitMorningAfternoon = (
    tempResults: UseQueryResult<WaterTempItem, Error>[],
    times: string[]
): { morningData: WaterTempItem[]; afternoonData: WaterTempItem[] } => {
    const morningData = tempResults
        .filter((_, index) => parseInt(times[index].slice(0, 2), 10) < 12) // 오전 시간 필터링
        .map((result) => result.data)
        .filter((data) => data); // null 데이터 제거

    const afternoonData = tempResults
        .filter((_, index) => parseInt(times[index].slice(0, 2), 10) >= 12) // 오후 시간 필터링
        .map((result) => result.data)
        .filter((data) => data); // null 데이터 제거

    return { morningData, afternoonData };
};
