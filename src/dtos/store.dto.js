export const bodyToReview = (body, params) => {
    return {
        storeId: params.storeId,
        starPoint: body.starPoint,
        content: body.content,
    };
  };

export const responseFromReview = ({user, review}) => {
    return {
        reviewId: review[0].id,
        creatorNickName: user[0].name,
        starPoint: review[0].star_point,
        content: review[0].content,
    };
};

export const bodyToMission = (body, params) => {
    const deadline = new Date(body.deadline);
    return {
        storeId: params.storeId,
        cond: body.cond,
        reward: body.reward,
        deadline: deadline,
    };
};

export const responseFromMission = ({store, mission}) => {
    return {
        missionId: mission[0].id,
        storeName: store[0].name,
        cond: mission[0].cond,
        reward: mission[0].reward,
        deadline: mission[0].deadline,
    };
};