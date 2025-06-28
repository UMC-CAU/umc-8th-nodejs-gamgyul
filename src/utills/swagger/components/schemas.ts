/* 공통 응답 - SUCCESS */
export const CommonSuccessResponse = {
    type: "object",
    properties: {
        resultType: { type: "string", example: "SUCCESS" },
        error: { type: "object", nullable: true, example: null },
        success: { type: "object" },
    }
} as const;

/* 공통 응답 - FAIL */
export const CommonFailureResponse = {
    type: "object",
    properties: {
        resultType: { type: "string", example: "FAIL" },
        error: {
            type: "object",
            properties: {
                errorCode: { type: "string" },
                reason: { type: "string" },
                data: { type: "object" }
            }
        },
        success: { type: "object", nullable: true, example: null },
    }
} as const;

/* 회원 가입 RequestBody */
export const SignUpUserRequest = {
    type: "object",
    properties: {
        email: { type: "string" },
        name: { type: "string" },
        gender: { type: "string" },
        birth: { type: "string", format: "date" },
        address: { type: "string" },
        detailAddress: { type: "string" },
        phoneNumber: { type: "string" },
        preferences: { type: "array", items: { type: "number" } }
    }
} as const;

export const Mission = {
    type: "object",
    properties: {
        cond: { type: "number" },
        reward: { type: "number" },
        deadline: { type: "string", format: "date" }    
    }
} as const;

export const Review = {
    type: "object",
    properties: {
        starPoint: { type: "number" },
        content: { type: "string" }     
    }
} as const;