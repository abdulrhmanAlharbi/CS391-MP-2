import DailyWeather from "./components/DailyWeather.tsx";
import CurrentWeather from './components/CurrentWeather';
import {useEffect, useState} from "react";
import {Weather, Geolocation} from "./interfaces/types.ts";
import {styled} from "styled-components";

const ParentDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 80vw;
    margin: auto;
    height: 100vh;
    //background-color: #242424;
    gap: 2vh;
    @media screen and (max-width: 1000px) {
        width: 97vw;
    }
`
//header start
const Header = styled.header`
    display: flex;
    flex-direction: row;
    padding: 2vh 1vw 1vh 1vw;

`
const HeaderChildleft = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`
const HeaderChildright = styled.div`
    flex: 0.5;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
`
const Button = styled.button`
    align-items: end;
`
//header end
const WebsiteHeader = styled.h1`
    text-align: left;
    font: small-caps bold calc(3px + 1.5vw) Poppins;
`

const WebsiteDescription = styled.p`
    text-align: left;
    font: small-caps calc(2px + 0.7vw) Poppins;
`

export default function App() {
    const placeholder: Geolocation = {latitude: "-90", longitude: "0", city: "", country: "", timezone: ""};
    const weatherplaceholder: Weather = {
        current: {
            time: "",
            temperature_2m: 0,
                relative_humidity_2m: 0,
                apparent_temperature: 0,
                is_day: 1,
                precipitation: 0,
                rain: 0,
                cloud_cover: 0,
                wind_speed_10m: 0,
        },
        daily: {
            time: [],
                temperature_2m_max: [],
                temperature_2m_min: [],
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
                    await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${geolocation.latitude}&longitude=${geolocation.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,cloud_cover,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&past_days=3&&forecast_days=5&temperature_unit=fahrenheit&timezone=${geolocation.timezone}`)
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

    //misc - test day/night cycle
    const [cycle, setCycle] = useState(weather.current.is_day);
    function ChangeCycle() {
        if(cycle) {
            setCycle(0);
        } else {
            setCycle(1);
        }
    }

    //change theme when cycle is updated - to get original cycle on refresh
    useEffect(() => {
        setCycle(weather.current.is_day);
    }, [weather, weather.current.is_day]);

    return (
        <ParentDiv>
            <Header>
                <HeaderChildleft>
                    <WebsiteHeader>Live Weather Tracker</WebsiteHeader>
                    <WebsiteDescription>
                        This website fetches weather data from Open-Meteo API and determines the user's location through GeoJS API.
                        The website utilizes the user's IP to estimate their location and requires no additional permissions. The widgets display real-time weather conditions,
                        and the UI theme changes based on day/night cycle. The button in the top-right corner can be used to test the alternative theme.
                    </WebsiteDescription>
                </HeaderChildleft>
                <HeaderChildright>
                    <Button onClick={ChangeCycle}>change cycle ({cycle ? "night" : "day"})</Button>
                </HeaderChildright>
            </Header>
            <CurrentWeather currentw={weather.current} currentloc={geolocation} cycle={cycle}/>
            <DailyWeather dailyw={weather.daily} />
        </ParentDiv>
    )
}