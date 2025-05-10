import { MissionStatus } from "@prisma/client";
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

//미션에 대한 검증 수행
export const ifMissionChallenging = async({memberId, missionId}) => {
  const memberMission = await prisma.memberMission.findFirstOrThrow({where: {memberId: memberId, missionId: missionId}})
  //미션 상태가 진행중인지 검증
  if (!memberMission || memberMission.state !== MissionStatus.INCOMPLETE ){
    return null;
  }
  //미션 데드라인 검증
  const mission = await prisma.mission.findFirstOrThrow({
    where: {id: memberMission.missionId },
    select: {
      id: true,
      deadline: true,
    },
  });
  if (new Date() > mission.deadline) {
    return null;
  }
  return memberMission.id;
}

//미션 상태 바꾸기 + member point update
export const updateStatusOfMemberMission = async({memberId, memberMissionId}) => {
  return await prisma.$transaction(async (tx) => {
    //미션 상태 업데이트
    const updatedMemberMission = await tx.memberMission.update({
      where: {id: memberMissionId },
      data: {
        state: MissionStatus.COMPLETE,
      },
    });
    //포인트 업데이트
    const mission = await tx.mission.findFirstOrThrow({
      where: {id: updatedMemberMission.missionId},
      select: {
        reward: true,
      },
    });
    await tx.member.update({
      where: {id: memberId},
      data: {
        points: {
          increment: mission.reward,
        },
      },
    });
    return updatedMemberMission.id;
  });
}