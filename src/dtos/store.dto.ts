import { Member, Review, Store, Mission } from "@prisma/client";
import { getAllStoreMissions, getAllStoreReviews } from "../repositories/store.repository.js";

export type ReviewCreateInput = {
    content : string;
    starPoint : number;
    storeId: number;
}

export const bodyToReview = (
    body: { starPoint: number, content: string},
    params: { storeId: string }
) => {
    return {
        storeId: parseInt(params.storeId),
        starPoint: body.starPoint,
        content: body.content,
    };
};

export const responseFromReview = (
    {
        user,
        review
    }:{
        user: Member;
        review: Review | null;
    }
) => {
    return {
        reviewId: review!.id,
        creatorNickName: user.name,
        starPoint: review!.starPoint,
        description: review!.description,
    };
};

export const responseFromReveiws = (
    reviews: Awaited<ReturnType<typeof getAllStoreReviews>>
) => {
    return {
        data: reviews,
        pagination: {
            cursor: reviews.length ? reviews[reviews.length - 1].id : null
        },
    };
};

export const bodyToMission = (
    body: { cond: number, reward: number, deadline: string },
    params: { storeId: string }
) => {
    const deadline = new Date(body.deadline);
    return {
        storeId: parseInt(params.storeId),
        cond: body.cond,
        reward: body.reward,
        deadline: deadline,
    };
};

export const responseFromMission = (
    {
        store,
        mission
    }:{
        store: Store;
        mission: Mission | null;
    }
) => {
    return {
        missionId: mission!.id,
        storeName: store.name,
        cond: mission!.cond,
        reward: mission!.reward,
        deadline: mission!.deadline,
    };
};

export const responseFromMissions = (
    missions: Awaited<ReturnType<typeof getAllStoreMissions>>
) =>{
    return {
        data: missions,
        pagination: {
            cursor: missions.length ? missions[missions.length - 1].id : null
        },
    };
}