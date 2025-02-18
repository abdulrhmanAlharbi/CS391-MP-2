import ColorContainer from './components/ColorContainer';
import CurrentWeather from './components/CurrentWeather';
import {useEffect, useState} from "react";
import {Entry, Weather, Geolocation} from "./interfaces/types.ts";
import {styled} from "styled-components";

const ParentDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 80vw;
    margin: auto;
    height: 100vh;
    background-color: #242424;
`

const WebsiteHeader = styled.h1`
    color: #535bf2;
    text-align: center;
    padding: 3vh 0 2vh 0;
`

const WebsiteDescription = styled.p`
    color: #535bf2;
    text-align: center;
    padding: 0 0 2vh 0;
`

/*
export default function App() {
    const [color, setColor] = useState<Entry[]>([]);
    useEffect(() => {
        async function ApiRetrieve() {
            const rawData = await fetch("https://www.colourlovers.com/api/colors/new?format=json");
            const data: Entry[] = await rawData.json();
            setColor(data);
        }
        ApiRetrieve()
            .then(() => console.log("Successfully retrieved"))
            .catch((e) => console.log("there was an error" + e));
    }, [])

    return (
        <ParentDiv>
            <ColorContainer data={color} />
        </ParentDiv>
    )
}
*/

export default function App() {
    const placeholder: Geolocation = {latitude: "-90", longitude: "0", city: "", country: ""};
    const weatherplaceholder: Weather = {
        current: {
            temperature_2m: 0,
                relative_humidity_2m: 0,
                apparent_temperature: 0,
                is_day: 0,
                precipitation: 0,
                rain: 0,
                cloud_cover: 0,
                wind_speed_10m: 0,
        },
        daily: {
            time: [],
                temperature_2m_max: []
        }
    }

    const [geolocation, setGeolocation] = useState<Geolocation>(placeholder);
    const [weather, setWeather] = useState<Weather>(weatherplaceholder); //will store information from the api 2 items: weather current and daily

    useEffect(() => {
        //store info regarding the location of the user
       async function GeoRetrieve() {
           const rawIP = await fetch("https://get.geojs.io/v1/ip/geo.json");
           const IP: Geolocation = await rawIP.json();
           setGeolocation(IP);
       }
       GeoRetrieve()
            .then(() => console.log("geojs: Successful"))
            .catch((e) => console.log("geojs: " + e));


    }, [])

    //second use effect will call api2 after api1 is done. (retrieve weather after geolocation information is stored)
    useEffect (() => {
        //retrieve weather information
        async function WeatherRetrieve() {
            if (geolocation.latitude !== "-90" && geolocation.longitude !== "0") { //only retrieve from api after we have geolocation info
                const rawData =
                    await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${geolocation.latitude}&longitude=${geolocation.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,cloud_cover,wind_speed_10m&daily=temperature_2m_max&past_days=7&temperature_unit=fahrenheit`)
                const data: Weather = await rawData.json();
                setWeather(data);
            } else {
                console.log("Waiting for geolocation update...");
            }
        }
        //call function
        WeatherRetrieve()
            .then(() => console.log("open-meteo: Successful"))
            .catch((e) => console.log("open-meteo: " + e));

    }, [geolocation]) //wait for geolocation to change

    return (
        <ParentDiv>
            <WebsiteHeader>Weather Forecast</WebsiteHeader>
            <WebsiteDescription>show</WebsiteDescription>
            <CurrentWeather currentw={weather.current} currentloc={geolocation} />

        </ParentDiv>
    )
}