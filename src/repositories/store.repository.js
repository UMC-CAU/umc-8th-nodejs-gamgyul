import { pool, prisma } from "../db.config.js";

// Review 데이터 삽입
export const addReview = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [result] = await pool.query(
      `INSERT INTO review (star_point, member_id, store_id, description) VALUES (?, ?, ?, ?);`,
      [
        data.starPoint,
        data.memberId,
        data.storeId,
        data.content,
      ]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
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
  const conn = await pool.getConnection();

  try {
    const [review] = await pool.query(`SELECT * FROM review WHERE id = ?;`, reviewId);

    console.log(review);

    if (review.length == 0) {
      return null;
    }

    return review;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 가게 정보 얻기
export const getStore = async (storeId) => {
  const conn = await pool.getConnection();

  try {
    const [store] = await pool.query(`SELECT * FROM store WHERE id = ?;`, storeId);

    console.log(store);

    if (store.length == 0) {
      return null;
    }

    return store;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};