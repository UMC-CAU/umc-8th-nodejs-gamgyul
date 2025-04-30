import { pool } from "../db.config.js";

// Mission 데이터 삽입
export const addMission = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [result] = await pool.query(
      `INSERT INTO mission (reward, store_id, cond, deadline) VALUES (?, ?, ?, ?);`,
      [
        data.reward,
        data.storeId,
        data.cond,
        data.deadline,
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

// 미션 정보 얻기
export const getMission = async (missionId) => {
  const conn = await pool.getConnection();

  try {
    const [mission] = await pool.query(`SELECT * FROM mission WHERE id = ?;`, missionId);

    console.log(mission);

    if (mission.length == 0) {
      return null;
    }

    return mission;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
