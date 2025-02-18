import {Geolocation, Weather} from "../interfaces/types.ts";
import {styled} from 'styled-components';

const WeatherContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 60vw;
    margin: 0 auto;
    height: 35vh;
    background: linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 236, 210, 1));
    border: #332d2d 0.2vw solid; //dynamic property or 3.2px
    border-radius: 15px;
    padding: 2vw 3.3vh 2vw 3vh;
    color: #332d2d;
    box-shadow: 1px 2px 20px black;
`

//small containers inside the weather container
const InfoContainerLeft = styled.div`
    text-align: left;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
//children start
//content inside the small containers
const LocationText = styled.h2`
    font: small-caps bold calc(5px + 1.5vw) Poppins;

`
const WeatherText = styled.h2`
    padding-top: 1.5vh;
    font: small-caps bold calc(15px + 3.5vw) Poppins;
`

const FeelsLikeText = styled.h3`
    padding-left: 2vw;
    padding-top: 1vh;
    font: small-caps  calc(3px + 1vw) Poppins;
`

//children end
//small containers inside the weather container
const InfoContainerRight = styled.div`
    text-align: right;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
//children start
//content inside the small containers
const ContentHeader = styled.h3`
    padding-left: 2vw;
    padding-top: 1vh;
    font: small-caps bold calc(5px + 1.3vw) Poppins;
`

const ExtraContent = styled.h3`
    padding-left: 2vw;
    padding-top: 1vh;
    font: small-caps  calc(3px + 1vw) Poppins;
`
//children end

export default function CurrentWeather(props : { currentw: Weather["current"], currentloc: Geolocation }) {
    return (
        <WeatherContainer>
            <InfoContainerLeft>
                <LocationText>{props.currentloc.city},</LocationText>
                <LocationText>{props.currentloc.country}</LocationText>
                <WeatherText>{props.currentw.temperature_2m}°F</WeatherText>
                <FeelsLikeText>Feels like {props.currentw.apparent_temperature}°F</FeelsLikeText>
            </InfoContainerLeft>
            <InfoContainerRight>
                <ContentHeader>Cloud cover: {props.currentw.cloud_cover}%</ContentHeader>
                <ExtraContent>precipitation: {props.currentw.precipitation}%</ExtraContent>
                <ExtraContent>Humidity: {props.currentw.relative_humidity_2m}%</ExtraContent>
                <ExtraContent>Wind speed: {props.currentw.wind_speed_10m} km/h</ExtraContent>
            </InfoContainerRight>
        </WeatherContainer>
    )
}