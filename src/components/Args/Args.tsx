import { Formats } from "../../constants";
import { Arguments } from "../../types";

export interface ArgsProps {
    args: Arguments; 
    setArgs: React.Dispatch<React.SetStateAction<Arguments>>;
};

const Args = ({args, setArgs}: ArgsProps) => {
    const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setArgs({...args, [name]: event.target.value});
    };
    const handleClick = (name: string) => () => {
        const checkbox = document.getElementById(name) as HTMLInputElement;
        setArgs({...args, [name]: checkbox.checked});
    };
    return (
        <table>
          <tbody>
            <tr>
              <td><label><input type="checkbox" id="useFfmpegSource" checked={args.useFfmpegSource} onClick={handleClick("useFfmpegSource")}/> use ffmpeg source</label></td>
              <td><textarea id="ffmpegSource" value={args.ffmpegSource} onChange={handleChange("ffmpegSource")}/></td>
            </tr>
            <tr>
              <td>format</td>
              <td>
                <select id="format" value={args.format} onChange={handleChange("format")}>
                  {Formats.map((value: string) => {
                    return <option key={value} value={value}>{value}</option>;
                  })}
                </select>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <label><input type="checkbox" id="loop" checked={args.loop} onChange={handleClick("loop")}/> loop video</label>
              </td>
            </tr>
          </tbody>
        </table>
    );
};

export default Args;