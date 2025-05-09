import { prisma } from "../db.config.js";

// User 데이터 삽입
export const addUser = async (data) => { 
  const user = await prisma.member.findFirst({ where: {email: data.email}});
  if (user) {
    return null;
  }

  const created = await prisma.member.create({ data: data });
  return created.id;
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
  const user = await prisma.member.findFirstOrThrow({ where: {id: userId }});
  return user;  
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
  await prisma.userFavorCategory.create({
    data: {
      memberId: userId,
      foodCategoryId: foodCategoryId
    },
  });
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
  const preferences = await prisma.userFavorCategory.findMany({
    select: {
      id: true,
      memberId: true,
      foodCategoryId: true,
      foodCategory: true,
    },
    where: { memberId: userId },
    orderBy: { foodCategoryId: "asc" },
  });

  return preferences;
};

// 사용자 별 리뷰 반환
export const getAllReviewsByMember = async(userId, cursor) => {
  const reviews = await prisma.review.findMany({
    select: {
      id: true,
      description: true,
      storeId: true,
      memberId: true,
      store: true,
      //member는 중복되는 정보이므로 responseDTO에서 한번만 처리하도록 함.
    },
    where: { memberId: userId, id: {gt: cursor}},
    orderBy: { id: "asc"},
    take: 5,
  });
  return reviews;
}