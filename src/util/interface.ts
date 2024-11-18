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
    lng: number
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

export type WeatherResponse = {
    items: {
        item: WeatherItem[];
    };
};

export type TransformedData = {
    tmp: { fcstTime: string; fcstValue: string }[];
    pty: string;
    sky: string;
    emoji: string;
};