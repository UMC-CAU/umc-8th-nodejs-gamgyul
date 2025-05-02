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

// MemberMission 데이터 삽입 == mission 도전
export const addMemberMission = async ({missionId, userId}) => {
  const conn = await pool.getConnection();
  
  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM members_mission WHERE member_id = ? and mission_id = ?) as isChallenging;`,
      [
        userId,
        missionId
      ]
    );
      
    if (confirm[0].isChallenging) {
      return null;
    }
        
    const [result] = await pool.query(
      `INSERT INTO members_mission (member_id, mission_id) VALUES (?, ?);`,
      [
        userId,
        missionId
        //status의 경우 default "INCOMPLETE"으로 설정되어있음.
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

// MemberMission 정보 얻기
export const getMemberMission = async (memberMissionId) => {
  const conn = await pool.getConnection();
  
  try {
    const [memberMission] = await pool.query(`SELECT * FROM members_mission WHERE id = ?;`, memberMissionId);
  
    console.log(memberMission);
  
    if (memberMission.length == 0) {
      return null;
    }
  
    return memberMission;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};