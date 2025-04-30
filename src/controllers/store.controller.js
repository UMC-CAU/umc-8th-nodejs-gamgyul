import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/store.dto.js";
import { bodyToMission } from "../dtos/store.dto.js";
import { createReview } from "../services/store.service.js";
import { createMission } from "../services/store.service.js";

export const createNewReview = async (req, res, next) => {
  console.log("리뷰 POST 요청");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
  const review = await createReview(bodyToReview(req.body, req.params));
  res.status(StatusCodes.OK).json({ result: review });
};

export const createNewMission = async (req, res, next) => {
    console.log("미션 POST 요청");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
    const mission = await createMission(bodyToMission(req.body, req.params));
    res.status(StatusCodes.OK).json({ result: mission });
  };