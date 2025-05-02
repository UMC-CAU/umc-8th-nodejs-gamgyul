export const bodyToMemberMission = (params) => {
    return {
        missionId: params.missionId,
    };
};

export const responseFromMemberMission = ({mission, memberMission}) => {
    return {
        memberMissionId : memberMission[0].id,
        status: memberMission[0].status,
        reward: mission[0].reward,
        cond: mission[0].cond,
        deadline: mission[0].deadline,
    };
};