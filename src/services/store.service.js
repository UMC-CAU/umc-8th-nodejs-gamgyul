import {
    responseFromMission,
    responseFromReview,
    responseFromReveiws
} from "../dtos/store.dto.js";
import {
  getUser,
} from "../repositories/user.repository.js";
import {
    getStore,
    addReview,
    getReview,
    getAllStoreReviews
} from "../repositories/store.repository.js";
import {
    getMission,
    addMission
} from "../repositories/mission.repository.js";
import dotenv from 'dotenv';

dotenv.config();

export const createReview = async (data) => {
    const userId = parseInt(process.env.DEFAULT_USER_ID);
    const user = await getUser(userId);
    if (user === null) {
        throw new Error("USER NOT FOUND");
    }

    const store = await getStore(data.storeId);
    //가게의 존재 여부 검증
    if (store === null) {
        throw new Error("STORE NOT FOUND");
    }
    
    //addReview
    const joinReviewId = await addReview({
        starPoint: data.starPoint,
        memberId: userId,
        storeId: data.storeId,
        content: data.content,
    });
    const review = await getReview(joinReviewId);
    return responseFromReview({ user, review });
}

export const createMission = async (data) => {
    const store = await getStore(data.storeId);
    //가게의 존재 여부 검증
    if (store === null) {
        throw new Error("STORE NOT FOUND");
    }

    //addMission
    const joinMissionId = await addMission({
        reward: data.reward,
        storeId: data.storeId,
        cond: data.cond,
        deadline: data.deadline,
    });
    const mission = await getMission(joinMissionId);
    return responseFromMission({ store, mission });
}

export const listStoreReviews = async(storeId, cursor) => {
    const reviews = await getAllStoreReviews(storeId, cursor);
    return responseFromReveiws(reviews);
};