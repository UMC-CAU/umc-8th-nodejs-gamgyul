import { prisma } from "../db.config.js";

// Review 데이터 삽입
export const addReview = async (data) => {
  const review = await prisma.review.create({
    data: {
      description: data.content,
      starPoint: data.starPoint,
      memberId: data.memberId,
      storeId: data.storeId,
    },
  });
  return review.id;
};

//getReviewByStore
export const getAllStoreReviews = async(storeId, cursor) =>{
  const reviews = await prisma.review.findMany({
    select: {
      id: true,
      description: true,
      storeId: true,
      memberId: true,
      store: true,
      member: true,
    },
    where: { storeId: storeId, id: { gt: cursor  } },
    orderBy: {id: "asc"},
    take: 5,
  });
  return reviews;
};

// 리뷰 정보 얻기
export const getReview = async (reviewId) => {
  const review = await prisma.review.findFirstOrThrow({where: {id: reviewId}});
  return review;
};

// 가게 정보 얻기
export const getStore = async (storeId) => {
  const store = await prisma.store.findFirstOrThrow({where: {id: storeId}});
  return store;
};

export const getAllStoreMissions = async (storeId, cursor) =>{
  const missions = await prisma.mission.findMany({
    select: {
      id: true,
      cond: true,
      deadline: true,
      reward: true,
      storeId: true,
      store: true,
    },
    where: { storeId: storeId, id: { gt: cursor }},
    orderBy: { id: "asc"},
    take: 5,
  });
  return missions;
}