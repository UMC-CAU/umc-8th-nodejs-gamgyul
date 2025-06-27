import swaggerAutogen from "swagger-autogen";
import * as schemas from './components/schemas.js';
import { Request, Response, NextFunction } from 'express';

const doc = {
    info: {
      title: "UMC 8th",
      description: "UMC 8th Node.js 테스트 프로젝트입니다.",
    },
    host: "localhost:3000",
    components: {
        schemas,
    },
};

const routes = ['./src/index.ts'];

const swaggerHandler = async (req: Request, res: Response, next: NextFunction) => {
// #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null"; // 파일 출력은 사용하지 않습니다.
  
  try {
    const result = await swaggerAutogen(options)(outputFile, routes, doc);
    res.json(result ? result.data : null); 
  } catch (err) {
    next(err);
  }
};

export { swaggerHandler };