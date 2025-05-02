import { responseFromMemberMission } from "../dtos/mission.dto.js";
import {
  getUser,
} from "../repositories/user.repository.js";
import {
    getMission,
    addMemberMission,
    getMemberMission
} from "../repositories/mission.repository.js";
import dotenv from 'dotenv'

dotenv.config();

export const challengeMission = async (data) => {
    const userId = process.env.DEFAULT_USER_ID;
    const user = await getUser(userId);
    if (user === null) {
        throw new Error("USER NOT FOUND");
    }

    console.log(data.missionId);
    const mission = await getMission(data.missionId);
    if (mission === null) {
        throw new Error("MISSION NOT FOUND");
    }

    const joinmemberMissionId = await addMemberMission({
        missionId: data.missionId, 
        userId: userId
    });
    //미션이 도전중인지 검증
    if (joinmemberMissionId === null){
        throw new Error("MISSION ALREADY UNDERWAY");
    }
    
    const memberMission = await getMemberMission(joinmemberMissionId);
    return responseFromMemberMission({ mission, memberMission });
};