import { prisma } from "../config/db.config.js";
import { ReviewCreateInput } from "../dtos/store.dto.js";

// Review 데이터 삽입
export const addReview = async (data: ReviewCreateInput) => {
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
export const getAllStoreReviews = async(storeId: number, cursor: number) =>{
  const reviews = await prisma.review.findMany({
    select: {
      id: true,
      description: true,
      starPoint: true,
      store: {
        select: {
          id: true,
          name: true,
          roadAddress: true,
          starPoint: true,
        }
      },
      member: {
        select: {
          name: true,
        }
      },
    },
    where: { storeId: storeId, id: { gt: cursor  } },
    orderBy: {id: "asc"},
    take: 5,
  });
  return reviews;
};

// 리뷰 정보 얻기
export const getReview = async (reviewId: number) => {
  const review = await prisma.review.findFirst({where: {id: reviewId}});
  return review;
};

// 가게 정보 얻기
export const getStore = async (storeId: number) => {
  const store = await prisma.store.findFirst({where: {id: storeId}});
  return store;
};

export const getAllStoreMissions = async (storeId: number, cursor: number) =>{
  const missions = await prisma.mission.findMany({
    select: {
      id: true,
      cond: true,
      deadline: true,
      reward: true,
      store: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    where: { storeId: storeId, id: { gt: cursor }},
    orderBy: { id: "asc"},
    take: 5,
  });
  return missions;
}