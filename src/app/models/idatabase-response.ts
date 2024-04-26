export interface IDatabaseResponse {
    httpStatusCode: string;
    message: string;
    objetoRespuesta?: [];
    singleRespuesta?: {
        type: string;
        value: any;
    }
    status: string;
    timeStamp: string;
}
