import { StatusCodes } from "http-status-codes";
import { bodyToMemberMission } from "../dtos/mission.dto.js";
import { challengeMission, completeMission } from "../services/mission.service.js";

export const handleMissionChallenge = async (req, res, next) => {
    try {
        console.log("미션 도전!");
        const memberMission = await challengeMission(bodyToMemberMission(req.params));
        res.status(StatusCodes.OK).success(memberMission);
    }
    catch(err) {
        next(err);
    }
};

export const handleMissionSuccess = async (req, res, next) => {
    try {
        const memberMission = await completeMission(
            parseInt(req.params.missionId)
        );
        res.status(StatusCodes.OK).success(memberMission);
    }
    catch(err) {
        next(err);
    }
};