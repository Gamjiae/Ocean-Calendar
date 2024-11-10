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