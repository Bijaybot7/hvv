/// <reference types="multer" />
export declare class FileController {
    constructor();
    uploadFiles(files: Array<Express.Multer.File>): Promise<{
        message: string;
        paths: string[];
    }>;
}
