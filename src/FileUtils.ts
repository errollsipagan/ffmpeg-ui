export interface FileWithPath extends File {
    path: string;
}

export default class FileUtils {
    private file: FileWithPath;

    constructor(file: FileWithPath) {
        this.file = file;
    }

    getFilePath = (): string => {
        try {
            return this.file.path;
        } catch {
            return this.file.webkitRelativePath;
        }
    }

    getFileName = (): string => {
        return this.file.name;
    }

    getFileType = (): string => {
        const fileType = this.file.type.split('/');
        return fileType[fileType.length-1];
    }

    changeFileExtension = (newExtension: string): string => {
        return this.getFileName().split('.')[0] + '.' + newExtension;
    }

    getNewFilePath = (newExtension: string): string => {
        const newFile = this.changeFileExtension(newExtension);
        const newFilePath = this.getFilePath().replace(this.getFileName() as string, newFile);
        return newFilePath;
    }
}