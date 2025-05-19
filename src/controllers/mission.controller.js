import { StatusCodes } from "http-status-codes";
import { bodyToMemberMission } from "../dtos/mission.dto.js";
import { challengeMission, completeMission } from "../services/mission.service.js";

export const handleMissionChallenge = async (req, res, next) => {
  /*
    #swagger.tags = ["Mission"];
    #swagger.summary = '미션 도전하기 API';
    #swagger.responses[200] = {
      description: "도전하기 성공 응답",
      content: {
        "application/json": {
          schema: {
            allOf: [ { $ref : "#/components/schemas/CommonSuccessResponse" }, {
              type: "object",
              properties: {
                success: {
                  allOf: [
                    { type: "object", properties: { memberMissionId: { type: "number" }}},
                    { $ref: "#/components/schemas/Mission" }
                  ]
                }
              }
            }]
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "이미 도전중인 미션",
      content: {
        "application/json": {
          schema: {
            allOf: [ { $ref: "#/components/schemas/CommonFailureResponse" }, {
              type: "object",
              properties: {
                error: {
                  type: "object",
                  properties: {
                    errorCode: { example : "M001" },
                    reason: { example: "MISSION ALREADY UNDERWAY" }
                  }
                }
              }
            }]
          }
        }
      }
    };
    #swagger.responses[404] = {
      description: "NOT_EXIST_ERROR",
      content: {
        "application/json": {
          schema: {
            allOf: [ { $ref: "#/components/schemas/CommonFailureResponse" }, {
              type: "object",
              properties: {
                error: {
                  type: "object",
                  properties: {
                    errorCode: { example : "NOT_FOUND" },
                    reason: { example: "MISSION NOT FOUND" },
                    data: { type: "object", properties: { id: { type: "number" }}}
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
    console.log("미션 도전!");
    const memberMission = await challengeMission(bodyToMemberMission(req.params));
    res.status(StatusCodes.OK).success(memberMission);
  }
  catch(err) {
    next(err);
  }
};

export const handleMissionSuccess = async (req, res, next) => {
  /*
    #swagger.tags = ["Mission"];
    #swagger.summary = '미션 성공으로 상태 바꾸기 API';
    #swagger.responses[200] = {
      description: "미션 상태 바꾸기 성공 응답",
      content: {
        "application/json": {
          schema: {
            allOf: [ { $ref : "#/components/schemas/CommonSuccessResponse" }, {
              type: "object",
              properties: {
                success: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "COMPLETE" },
                    points: { type: "number" }
                  }
                }
              }
            }]
          }
        }
      }
    };
    #swagger.responses[403] = {
      description: "기한 만료 또는 이미 성공한 미션",
      content: {
        "application/json": {
          schema: {
            allOf: [ { $ref: "#/components/schemas/CommonFailureResponse" }, {
              type: "object",
              properties: {
                error: {
                  type: "object",
                  properties: {
                    errorCode: { example : "M002" },
                    reason: { example: "MISSION STATE IS NOT VALID" },
                    data: { type: "object", properties: { deadline: { type: "string", format : "date" }}}
                  }
                }
              }
            }]
          }
        }
      }
    };
    #swagger.responses[404] = {
      description: "NOT_EXIST_ERROR",
      content: {
        "application/json": {
          schema: {
            allOf: [ { $ref: "#/components/schemas/CommonFailureResponse" }, {
              type: "object",
              properties: {
                error: {
                  type: "object",
                  properties: {
                    errorCode: { example : "NOT_FOUND" },
                    reason: { example: "MISSION NOT FOUND" },
                    data: { type: "object", properties: { id: { type: "number" }}}
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
    const memberMission = await completeMission(
      parseInt(req.params.missionId)
    );
    res.status(StatusCodes.OK).success(memberMission);
  }
  catch(err) {
    next(err);
  }
};