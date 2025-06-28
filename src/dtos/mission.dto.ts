import { Mission, MemberMission, Member } from "@prisma/client";

export const bodyToMemberMission = (params: {missionId: string}) => {
    return {
        missionId: parseInt(params.missionId),
    };
};

export const responseFromMemberMission = (
    {
        mission,
        memberMission
    }:{
        mission: Mission,
        memberMission: MemberMission,
    }
) => {
    return {
        memberMissionId : memberMission.id,
        status: memberMission.state,
        reward: mission.reward,
        cond: mission.cond,
        deadline: mission.deadline,
    };
};

export const responseFromMissionSuccess = (
    {
        memberMission,
        member
    }:{
        memberMission: MemberMission,
        member: Member,
    }
) => {
    return {
        status : memberMission.state,
        points : member.points
    };
};