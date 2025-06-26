import swaggerAutogen from "swagger-autogen";
import * as schemas from '../src/utills/swagger/components/schemas.js';

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

const outputFile = '../dist/swagger-output.json';
const routes = ['./src/index.ts'];

const options = {
    openapi: '3.0.0',
    disableLogs: false,
};

swaggerAutogen(options)(outputFile, routes, doc);