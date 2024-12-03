export interface ApiResponse<T> {
    success: boolean;
    message: string;
    errorMessage: string | null;
    data: T;
    timestamp: string;
    statusCode: number;
}
