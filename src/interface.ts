export interface ForecastData {
    fcstTime: string;
    fcstValue: string;
}

export interface WeatherData {
    tmp: ForecastData[];
    pty: string;
    sky: string;
    emoji: string;
}

export type TideData = {
    tph_level: string,
    tph_time: string,
    hl_code: '고조' | '저조'
}