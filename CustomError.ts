// types/CustomError.ts ou interfaces/CustomError.ts
export interface CustomError extends Error {
    data?: {
        status?: number;
    };
}
