export const generateTimes = (date: Date, currentDate: Date): string[] => {
    const times: string[] = [];
    let endDate = new Date(date);

    // 오늘 날짜인지 확인
    if (
        date.getFullYear() === currentDate.getFullYear() &&
        date.getMonth() === currentDate.getMonth() &&
        date.getDate() === currentDate.getDate()
    ) {
        endDate = new Date(currentDate); // 현재 시간까지만
    } else {
        endDate.setHours(23, 30, 0, 0); // 과거 날짜는 23:30까지
    }

    const startDate = new Date(date);
    startDate.setHours(0, 30, 0, 0); // 0:30부터 시작

    for (let time = startDate; time <= endDate; time.setMinutes(time.getMinutes() + 60)) {
        const hours = time.getHours().toString().padStart(2, "0");
        const minutes = time.getMinutes().toString().padStart(2, "0");
        times.push(hours + minutes);
    }

    return times;
};

export const generateLastThreeHours = (currentDate: Date): string[] => {
    const times: string[] = [];
    
    // 현재 시간, 한 시간 전, 두 시간 전
    for (let i = 0; i < 3; i++) {
        const time = new Date(currentDate);
        time.setHours(time.getHours() - i);
        time.setMinutes(Math.floor(time.getMinutes() / 30) * 30); // 30분 단위로 맞추기
        
        const hours = time.getHours().toString().padStart(2, "0");
        const minutes = time.getMinutes().toString().padStart(2, "0");
        times.push(hours + minutes);
    }
    
    return times;
};