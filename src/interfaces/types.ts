export interface Entry { //object that will store information we need form the api
    id: number;
    title: string;
    hex: string;
}

export interface Weather {
    current: {
        time: string;
        temperature_2m: number;
        relative_humidity_2m: number;
        apparent_temperature: number;
        is_day: number;
        precipitation: number;
        rain: number;
        cloud_cover: number;
        wind_speed_10m: number;
    }
    daily: {
        time: string[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
    }
}

export interface Geolocation {
    latitude: string;
    longitude: string;
    country: string;
    city: string;
}