export class CustomError extends Error {
    constructor(reason, errorCode, statusCode, data = null) {
        super(reason);
        this.reason = reason;
        this.name = this.constructor.name;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.data = data;
        Error.captureStackTrace(this, this.constructor);
    }
}
//피클 깃허브 염탐했어요..ㅎ

export class DuplicateUserEmailError extends CustomError {
    constructor(reason, data = null) {
        super(reason, "U001", 400, data);
    }
}

export class NotExistsError extends CustomError {
    constructor(reason, data = null) {
        super(reason, "NOT_EXISTS", 404, data);
    }
}

export class AlreadyUnderwayMissionError extends CustomError {
    constructor(reason, data = null) {
        super(reason, "M001", 400, data);
    }
}

export class InvalidToCompleteMissionError extends CustomError {
    constructor(reason, data = null) {
        super(reason, "M002", 403, data);
    }
}