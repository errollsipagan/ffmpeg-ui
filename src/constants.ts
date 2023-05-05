import { Arguments, KeyValue, VideoFilter } from "./types";

export const Formats = [
    "gif","mp4","mp3","wav"
];

export const FormatsWithVideoFilter = [
    "gif"
];

export const FormatsWithLoop = [
    "gif"
];

export const ScallingAlgorithms: KeyValue[] = [
    {
        key: 'fast_bilinear',
        value: 'fast bilinear',
    },
    {
        key: 'bilinear',
        value: 'bilinear',
    },
    {
        key: 'bicubic',
        value: 'bicubic',
    },
    {
        key: 'lanczos',
        value: 'lanczos',
    },
];

export const DefaultVideoFilter: VideoFilter = {
    fps: 10,
    scaleW: 320,
    scaleH: -1,
    flags: ScallingAlgorithms[0].key,
};

export const DefaultFormat: string = Formats[2];

export const DefaultArguments: Arguments = {
    useFfmpegSource: false,
    ffmpegSource: "/opt/homebrew/Cellar/ffmpeg/5.1.2_5/bin",
    format: DefaultFormat,
    loop: false,
};

export const Space = ' ';