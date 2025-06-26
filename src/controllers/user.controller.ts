import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp, listMemberReviews } from "../services/user.service.js";

export const handleUserSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    /*
    #swagger.tags = ["Member"];
    #swagger.summary = '회원 가입 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/SignUpUserRequest" }
        }
      }
    };
    #swagger.responses[200] = {
      description: "회원 가입 성공 응답",
      content: {
        "application/json": {
          schema: {
            allOf: [
              { $ref : "#/components/schemas/CommonSuccessResponse" },
              {
                type: "object",
                properties: {
                  success: { 
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      email: { type: "string" },
                      preferCategory: { type: "array", items: { type: "string" } }
                    }
                  }
                }
              }
            ]
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "회원 가입 실패 응답",
      content: {
        "application/json": {
          schema: {
            allOf: [
              { $ref: "#/components/schemas/CommonFailureResponse" },
              {
                type: "object",
                properties: {
                  error: {
                    type: "object",
                    properties: {
                      errorCode: { example : "U001" },
                      reason: { example: "이미 존재하는 이메일입니다." },
                      data: {
                        type: "object",
                        properties: {
                          email: { type: "string", example: "test@example.com" }
                        }
                      }
                    }
                  }
                }
              }
            ]
          }
        }
      }
    };
  */
  try {
    console.log("회원가입을 요청했습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

    const user = await userSignUp(bodyToUser(req.body));
    res.status(StatusCodes.OK).success(user);
  } catch(err) {
    next(err);
  }
};

export const handleListMemberReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /*
    #swagger.tags = ["Member"];
    #swagger.summary = '멤버 별 리뷰 목록 조회 API';
    #swagger.parameters["cursor"] = { description: "Default 0, pagination/cursor 값을 다음 응답으로 넣어주세요." }
    #swagger.responses[200] = {
      description: "내 리뷰 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            allOf: [ { $ref: "#/components/schemas/CommonSuccessResponse" }, {
              type: "object",
              properties: {
                success: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: { type: "object", 
                        properties: {
                          id: { type: "number" }, 
                          description: { type: "string"},
                          starPoint: { type: "number" },
                          store: { type: "object", properties: {
                            id: { type: "number" }, 
                            name: { type: "string" }
                          }}
                        }
                      }
                    },
                    pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                  }
                }
              }
            }]
          }
        }
      }
    };
  */
  try {
    const reviews = await listMemberReviews(
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(reviews);
  } catch(err) {
    next(err);
  }
};