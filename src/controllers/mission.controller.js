import { StatusCodes } from "http-status-codes";
import { bodyToMemberMission } from "../dtos/mission.dto.js";
import { challengeMission } from "../services/mission.service.js";

export const handleMissionChallenge = async (req, res, next) => {
    console.log("미션 도전!");
    const memberMission = await challengeMission(bodyToMemberMission(req.params));
    res.status(StatusCodes.OK).json({ result: memberMission });
};