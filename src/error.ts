import { StatusCodes } from "http-status-codes";

export class CustomError extends Error {
    reason: string;
    errorCode: string;
    statusCode: StatusCodes;
    data: any;

    constructor(reason: string, errorCode: string, statusCode: StatusCodes, data: any = null) {
        super(reason);
        this.reason = reason;
        this.name = this.constructor.name;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.data = data;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class DuplicateUserEmailError extends CustomError {
    constructor(reason: string, data: any = null) {
        super(reason, "U001", StatusCodes.BAD_REQUEST, data);
    }
}

export class NotExistsError extends CustomError {
    constructor(reason: string, data: any = null) {
        super(reason, "NOT_FOUND", StatusCodes.NOT_FOUND, data);
    }
}

export class AlreadyUnderwayMissionError extends CustomError {
    constructor(reason: string, data: any = null) {
        super(reason, "M001", StatusCodes.BAD_REQUEST, data);
    }
}

export class InvalidToCompleteMissionError extends CustomError {
    constructor(reason: string, data: any = null) {
        super(reason, "M002", StatusCodes.FORBIDDEN, data);
    }
}