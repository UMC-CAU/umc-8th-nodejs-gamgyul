import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import {
  handleUserSignUp,
  handleListMemberReviews
} from "./controllers/user.controller.js";
import {
  createNewReview,
  createNewMission,
  handleListStoreReviews,
  handleListStoreMissions
} from './controllers/store.controller.js';
import { handleMissionChallenge } from './controllers/mission.controller.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());  //cors 방식 허용
app.use(express.static('public'));  //정적 파일 접근
app.use(express.json());  //request의 본문을 json으로 해석할 수 있도록 함. => json 형태의 요청 body를 파싱하기 위함.
app.use(express.urlencoded({ extended: false })); //단순 객체 문자열 형태로 본문 데이터 해석

app.get('/', (req, res) => {
  res.send('Hello World!메롱')
})

//week5
app.post("/members/information", handleUserSignUp);
app.post("/stores/:storeId/reviews", createNewReview);
app.post("/stores/:storeId/missions", createNewMission);
app.post("/missions/:missionId", handleMissionChallenge);

//week6
app.get("/stores/:storeId/reviews", handleListStoreReviews);
app.get("/members/reviews", handleListMemberReviews);
app.get("/stores/:storeId/missions", handleListStoreMissions);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})