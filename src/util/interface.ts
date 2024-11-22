export interface AutoSearchProps {
    containerStyle?: React.CSSProperties;
    inputStyle?: React.CSSProperties;
    showImg?: boolean;
}
  
export interface AutoDatas {
    num: number;
    name: string;
}

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
    tph_level: string;
    tph_time: string;
    hl_code: '고조' | '저조'
}

export type Coordinate = {
    lat: number;
    lng: number;
}

export type WeatherItem = {
    beachNum: string;
    baseDate: string;
    baseTime: string;
    category: string;
    fcstDate: string;
    fcstTime: string;
    fcstValue: string;
    nx: number;
    ny: number;
}

export interface WaterTempItem {
    beachNum: string;
    tm: string;  // 관측시간(년월일시분)
    tw: string;  // 수온
}

export type TransformedData = {
    tmp: { fcstTime: string; fcstValue: string }[];
    pty: string;
    sky: string;
    emoji: string;
};