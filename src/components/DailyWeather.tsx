import {styled} from "styled-components"
import {Weather} from "../interfaces/types.ts"

const DailyParent = styled.div`
    width: 100%;
    height: 20vh;
    display: flex;
    flex-direction: row;
    gap: 5px;
`

const DailyContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 0.2vw solid #332d2d;;
    background: #535bf2;
    background: linear-gradient(to bottom, #ffffff, #ffecd2);
    border-radius: 15px;
    color: #332d2d;
    box-shadow: 1px 2px 4px black;
`
//children start
const DateText = styled.h4`
    text-align: center;
    padding-bottom: 1vh;
    font: small-caps bold calc(4px + 1vw) Poppins;
    color: #c75300;
`
const TempMin = styled.h5`
    text-align: center;
    font: small-caps bold calc(2px + 0.9vw) Poppins;
`
const TempMax = styled.h5`
    text-align: center;
    font: small-caps bold calc(4px + 1vw) Poppins;
`
const Textsmall = styled.span`
    font: small-caps calc(2px + 0.7vw) Poppins;
    color: dimgray;
`
//children end

export default function DailyWeather(props: {dailyw: Weather}) { //contains date and max/min temperature
    return(
        <DailyParent>
            {
                props.dailyw.daily.time.map((time: string, index: number) => //index will be needed to get the temperature corresponding to the date
                <DailyContainer>
                    <DateText>{time}</DateText>
                    <TempMax>{props.dailyw.daily.temperature_2m_max[index]}°<Textsmall>MAX</Textsmall></TempMax>
                    <TempMin>{props.dailyw.daily.temperature_2m_min[index]}°<Textsmall>MIN</Textsmall></TempMin>
                </DailyContainer>
            )
            }
        </DailyParent>
    )
}