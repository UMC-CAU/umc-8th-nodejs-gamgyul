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