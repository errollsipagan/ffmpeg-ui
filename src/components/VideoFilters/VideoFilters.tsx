import { ScallingAlgorithms } from "../../constants";
import { VideoFilter } from "../../types";

export interface VideoFiltersProps {
    videoFilter: VideoFilter; 
    setVideoFilter: React.Dispatch<React.SetStateAction<VideoFilter>>;
}

const VideoFilters = ({ videoFilter, setVideoFilter }: VideoFiltersProps) => {
    const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setVideoFilter({...videoFilter, [name]: event.target.value});
    };
    return (
        <div>
            Video Filters:
            <table>
                <tbody>
                <tr>
                    <td>fps</td>
                    <td><input type="text" id="fps" value={videoFilter.fps} onChange={handleChange("fps")}/></td>
                </tr>
                <tr>
                    <td>scale width</td>
                    <td><input type="text" id="scaleW" value={videoFilter.scaleW} onChange={handleChange("scaleW")}/></td>
                </tr>
                <tr>
                    <td>scale height <br />(-1 for default aspect ratio)</td>
                    <td><input type="text" id="scaleH" value={videoFilter.scaleH} onChange={handleChange("scaleH")}/></td>
                </tr>
                <tr>
                    <td>flags</td>
                    <td>
                    <select id="flags" value={videoFilter.flags} onChange={handleChange("flags")}>
                        {ScallingAlgorithms.map(({ key, value }) => {
                            return <option key={key} value={key}>{value}</option>;
                        })}
                    </select>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default VideoFilters;