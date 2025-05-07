export const bodyToReview = (body, params) => {
    return {
        storeId: parseInt(params.storeId),
        starPoint: body.starPoint,
        content: body.content,
    };
  };

export const responseFromReview = ({user, review}) => {
    return {
        reviewId: review.id,
        creatorNickName: user.name,
        starPoint: review.starPoint,
        description: review.description,
    };
};

export const responseFromReveiws = (reviews) => {
    return {
        data: reviews,
        pagination: {
            cursor: reviews.length ? reviews[reviews.length - 1].id : null
        },
    };
};

export const bodyToMission = (body, params) => {
    const deadline = new Date(body.deadline);
    return {
        storeId: parseInt(params.storeId),
        cond: body.cond,
        reward: body.reward,
        deadline: deadline,
    };
};

export const responseFromMission = ({store, mission}) => {
    return {
        missionId: mission.id,
        storeName: store.name,
        cond: mission.cond,
        reward: mission.reward,
        deadline: mission.deadline,
    };
};