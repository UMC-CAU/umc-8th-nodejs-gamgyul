import { responseFromUser, responseFromReveiws } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  getAllReviewsByMember
} from "../repositories/user.repository.js";
import dotenv from 'dotenv'

dotenv.config();

export const userSignUp = async (data) => {
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    detailAddress: data.detailAddress,
    //phoneNumber: data.phoneNumber,
  });

  if (joinUserId === null) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};

export const listMemberReviews = async (cursor) => {
  const userId = parseInt(process.env.DEFAULT_USER_ID);
  const user = await getUser(userId);
  const reviews = await getAllReviewsByMember(userId, cursor);
  return responseFromReveiws({user, reviews});
}