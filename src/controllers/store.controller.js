import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/store.dto.js";
import { bodyToMission } from "../dtos/store.dto.js";
import {
  createReview,
  createMission,
  listStoreReviews,
  listStoreMissions
} from "../services/store.service.js";

export const createNewReview = async (req, res, next) => {
  try {
    console.log("리뷰 POST 요청");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
    const review = await createReview(bodyToReview(req.body, req.params));
    res.status(StatusCodes.OK).success(review);
  }
  catch (err) {
    next(err);
  }
};

export const createNewMission = async (req, res, next) => {
  try{
    console.log("미션 POST 요청");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
    const mission = await createMission(bodyToMission(req.body, req.params));
    res.status(StatusCodes.OK).success(mission);
  } catch(err) {
    next(err);
  }
};

export const handleListStoreReviews = async (req, res, next) => {
  /*
    #swagger.tags = ["Store"];
    #swagger.summary = '상점 리뷰 목록 조회 API';
    #swagger.parameters["cursor"] = { description: "Default 0, pagination/cursor 값을 다음 응답으로 넣어주세요." }
    #swagger.responses[200] = {
      description: "상점 리뷰 목록 조회 성공 응답",
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
                            name: { type: "string" }, 
                            roadAddress: { type: "string" }, 
                            starPoint: { type: "number" } }
                          },
                          member: { type: "object", properties: { name: { type: "string" } }}
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
  try{
    const reviews = await listStoreReviews(
      parseInt(req.params.storeId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(reviews);
  } catch(err) {
    next(err);
  }
};

export const handleListStoreMissions = async (req, res, next) => {
  /*
    #swagger.tags = ["Store"];
    #swagger.summary = '상점 미션 목록 조회 API';
    #swagger.parameters["cursor"] = { description: "Default 0, pagination/cursor 값을 다음 응답으로 넣어주세요." }
    #swagger.responses[200] = {
      description: "상점 미션 목록 조회 성공 응답",
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
                          cond: { type: "number" },
                          deadline: { type: "string", format: "date" },
                          reward: { type: "number" },
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
    const missions = await listStoreMissions(
      parseInt(req.params.storeId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(missions);
  } catch(err) {
    next(err);
  }
};