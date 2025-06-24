import dotenv from 'dotenv';
import express, { Request, Response, Express, NextFunction } from 'express';
import cors from 'cors';
import swaggerUiExpress from 'swagger-ui-express';
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
import { handleMissionChallenge, handleMissionSuccess } from './controllers/mission.controller.js';
import { swaggerHandler } from './utills/swagger/swagger.config.js';
import passport from 'passport';
import { googleStrategy } from './config/auth.config.js';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import session from 'express-session';
import { prisma } from './config/db.config.js';

dotenv.config();

passport.use(googleStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser<{ id: string; email: string; name: string }>
(
  (user, done) => done(null, user)
);

const app = express();
const port = process.env.PORT;

app.use(cors());  //cors 방식 허용
app.use(express.static('public'));  //정적 파일 접근
app.use(express.json());  //request의 본문을 json으로 해석할 수 있도록 함. => json 형태의 요청 body를 파싱하기 위함.
app.use(express.urlencoded({ extended: false })); //단순 객체 문자열 형태로 본문 데이터 해석

app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, //ms
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

/* Swagger 세팅 */
app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);

/* 소셜 로그인 : Google */
app.get("/oauth2/login/google", passport.authenticate("google"));
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    failureRedirect: "/oauth2/login/google",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);

app.get('/openapi.json', swaggerHandler);

/* 공통 응답을 사용할 수 있는 헬퍼 함수 등록 */
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});

app.get('/', (req, res) => {
  // #swagger.ignore = true
  console.log(req.user);
  res.send('Hello World!')
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
app.post("/missions/:missionId/success", handleMissionSuccess);

/* 전역 오류를 처리하기 위한 미들웨어 */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})