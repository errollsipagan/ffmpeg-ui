import FileUtils from "./FileUtils";
import { Arguments, VideoFilter } from "./types";

export default class StringDictionary {
    static pathSeparator = (platform: string) => {
        return platform === 'win32' ? '\\' : '/';
    };
    static ffmpeg:string = 'ffmpeg';
    static vf = (videoFilter: VideoFilter) => {
        return `-vf "fps=${videoFilter.fps},scale=${videoFilter.scaleW}:${videoFilter.scaleH}:flags=${videoFilter.flags},split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse"`;
    }
    static loop = (args: Arguments) => {
        return `-loop ${+args.loop}`;
    }
    static inputFile = (fileUtils: FileUtils) => {
        return `-i "${fileUtils.getFilePath()}"`;
    };
    static outputFile = (fileUtils: FileUtils, args: Arguments) => {
        const newFilePath = fileUtils.getNewFilePath(args.format);
        return `"${newFilePath}"`;
    };
    static getFfmpegSource = (args: Arguments, platform: string) => {
        return args.useFfmpegSource ? `${args.ffmpegSource}${this.pathSeparator(platform as string)}${this.ffmpeg}` : this.ffmpeg;
    }
    static errors = {
        sameType: "Cannot convert file into same file type"
    };
}