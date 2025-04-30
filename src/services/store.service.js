import { responseFromReview } from "../dtos/store.dto.js";
import {
  getUser,
} from "../repositories/user.repository.js";
import {
    getStore,
    addReview,
    getReview,
} from "../repositories/store.repository.js";
import dotenv from 'dotenv';

dotenv.config();

export const createReview = async (data) => {
    const userId = process.env.DEFAULT_USER_ID;
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