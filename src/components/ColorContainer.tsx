import {Entry} from "../interfaces/types.ts";

export default function ColorContainer(props : { data: Entry[] }) {
    return (
        <div style={{display: "flex", flexWrap: "wrap"}}>
            {
                props.data.map((color: Entry) =>
                    <div style={{backgroundColor: `#${color.hex}`, flex: "1"}}>
                        <h1>{color.id}</h1>
                        <h2>{color.title}</h2>
                        <p>#{color.hex}</p>
                    </div>
                )
            }
        </div>
            );
}