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