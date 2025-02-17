import {Weather} from "../interfaces/types.ts";

export default function CurrentWeather(props : { currentw: Weather["current"] }) {
    return (
        <div style={{backgroundColor: "red"}}>
            <h2>{props.currentw.temperature_2m}</h2>
        </div>
    )
}