export default class Utils {
    static isWindows = (plaform: string):boolean => {
        return plaform === 'win32';
    };
}