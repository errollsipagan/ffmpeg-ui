export type KeyValue = {
    key: string;
    value: string;
};

export type VideoFilter = {
    fps: number;
    scaleW: number;
    scaleH: number | -1;
    flags: string;
};

export type Arguments = {
    useFfmpegSource: boolean;
    ffmpegSource: string;
    inputFile?: string;
    format: string;
    loop: boolean;
};

export type SystemAPI = {
    platform: () => Promise<any>;
    execute: (command: string) => Promise<any>;
};

export type WindowWithSystemAPI =  Window & typeof globalThis & {
    System: SystemAPI;
};