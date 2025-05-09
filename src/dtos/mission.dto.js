export const bodyToMemberMission = (params) => {
    return {
        missionId: parseInt(params.missionId),
    };
};

export const responseFromMemberMission = ({mission, memberMission}) => {
    return {
        memberMissionId : memberMission.id,
        status: memberMission.status,
        reward: mission.reward,
        cond: mission.cond,
        deadline: mission.deadline,
    };
};

export const responseFromMissionSuccess = ({memberMission, member}) => {
    return {
        status : memberMission.state,
        points : member.points
    };
};