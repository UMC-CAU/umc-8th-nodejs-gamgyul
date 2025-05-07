import { prisma } from "../db.config.js";

// Mission 데이터 삽입
export const addMission = async (data) => {
  const mission = await prisma.mission.create({data: data});
  return mission.id;
};

// 미션 정보 얻기
export const getMission = async (missionId) => {
  const mission = await prisma.mission.findFirstOrThrow({where: {id: missionId}});
  return mission;
};

// MemberMission 데이터 삽입 == mission 도전
export const addMemberMission = async ({missionId, userId}) => {
  const memberMission = await prisma.memberMission.findFirst({where: {memberId: userId, missionId: missionId}});
  if (memberMission){
    return null;
  }
  const newMemberMission = await prisma.memberMission.create({
    data: {
      missionId: missionId,
      memberId: userId,
    },
  });
  return newMemberMission.id;
};

// MemberMission 정보 얻기
export const getMemberMission = async (memberMissionId) => {
  const memberMission = await prisma.memberMission.findFirstOrThrow({where: {id: memberMissionId}});
  return memberMission;
};