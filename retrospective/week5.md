# 🧠 5주차 회고 - 2025.05.06

## 🔧 작업한 내용
- GitHub와 Postman 사용법 익히기
- db.config.js를 작성하여 DB Connection Pool을 만들고 DB와 연결
- Express로 간단한 API 개발
    1. 회원가입 API (소셜 로그인 등 제외)
    2. 가게에 리뷰 추가하기 API
    3. 가게에 미션 추가하기 API
    4. 미션 도전하기 API
- Controller / Service / Repository 각각의 Layer의 역할에 맞게 구현
    1. Controller : 클라이언트로부터 req를 받고 요청에 해당하는 service에서 로직을 수행하여 res를 클라이언트로 전달하는 역할. (중간다리 역할)
    2. Service : 비즈니스 로직을 수행. 
    3. Repository : sql 쿼리로 DB와 연결하여 동작.

## 😕 어려웠던 점
- [nodemon] app crashed -waiting for file changes before starting...
    >> 비동기 함수에 대해 await를 빼먹어서 throw된 에러를 제대로 처리하지 못해 문제가 발생함. 코드를 짤 때 주의할 필요가 있어 보임.
- cannot read property (data.missionId : undefined)
    >> 구조분해할당을 사용하는 경우, 객체 리터럴을 명확하게 펼쳐서 넘겨야 명확하게 구조를 인식하여 undefined 문제의 발생을 막을 수 있다.

## 💡 배운 점 / 개선할 점
- 전체적인 Express API 개발의 흐름에 대해 알게 되었다.
- 환경변수, cors, DB connection pool 등 서버 개발에 있어 중요한 개념들을 알게 되었다.
- 비동기(async, await, promise)와 try/catch/finally과 같은 JS 문법을 배웠다.

- 트러블 슈팅을 하면서 아직 JS문법에 익숙하지 못한 것을 느꼈다. 미션을 수행하면서 문법에 대해서도 잘 정리해두면 좋을 것 같다.
- API의 검증 과정이나 url 설계 등이 다소 여러가지를 세밀하게 생각하지 못한 느낌이 있어, 시간 날 때 고쳐보면 좋을 듯 싶다.
- 현재 API에서 오류가 발생하는 경우 HTML 형태의 콘텐츠가 내려가는데, 이를 클라이언트에서 편하게 처리할 수 있도록 JSON 형태롤 응답을 내려줘야 할 필요가 있다.

## 🙌 느낀 점
- 확실히 Java와 비교했을 때, JavaScript가 다소 디버깅에 불리한 부분이 없지 않아 있는 것 같다는 생각이 들었다.(컴파일 타임에 체크해주는 부분이 덜해서 그런듯...?) 물론, 본인이 JS가 안 익숙해서 그럴 수도 있음.
- 오류의 throw 관련한 내용은 7주차에 다룬다고 하니 그 때 코드를 개선하면 좋을 것 같다.