export interface Entry { //object that will store information we need form the api
    id: number;
    title: string;
    hex: string;
}

export interface Weather {
    current: {
        temperature_2m: number;
        relative_humidity: number;
        apparent_temperature: number;
        is_day: number;
        precipitation: number;
        rain: number;
    }
    daily: {
        time: string[];
        temperature_2m_max: number[];
    }
}

export interface Geolocation {
    latitude: string;
    longitude: string;
    country: string;
    city: string;
}