# 🧠 6주차 회고 - 2025.05.12

## 🔧 작업한 내용
- ORM의 개념과 Prisma 이해하고 사용해보기
- schema.prisma 파일을 작성하여 코드기반으로 repository 구현
    1. repository 리팩토링
    2. dto 리팩토링
- prisma의 migration 기능을 이용하여 DB 마이그레이션 관리
- ORM을 사용하여 목록 API 구현
    1. 가게에 대한 리뷰 목록 조회 API
    2. 내가 작성한 리뷰 목록 조회 API
    3. 가게 별 미션 목록 조회 API
- 트랜잭션을 적용하여 안전하게 진행중인 미션을 진행완료로 변경하는 API 구현

## 😕 어려웠던 점
- npm run dev 수행 시 prisma generate가 계속 돌아가는 현상
    > npx prisma init으로 생긴 schema.prisma의 generator output 설정으로 인해 Client code의 경로를 찾지 못해 발생한 문제. output 설정을 지우거나, Client code의 경로를 명시해주어 문제를 해결할 수 있다. Prisma 상에서는 버전이 바뀌면서 output을 명시하는 것을 추천하는 것으로 보인다.

## 💡 배운 점 / 개선할 점
- Prisma와 ORM의 개념과 사용방법을 알게 되었다.
- Prisma 외에도 Sequelize와 TypeORM 등 다양한 ORM을 채택할 수 있음을 알게 되었다.
    > 각 ORM의 장단점을 알고 프로젝트의 상황에 맞는 ORM을 선택할 수 있다.
    > Knex 등 ORM과 함께 사용할 수 있는 쿼리 빌더 라이브러리도 존재한다.
- 페이지네이션을 구현하는 다양한 방법이 있음을 알게 되었다.
- Prisma에서 트랜잭션을 관리하는 방법을 알게 되었다.
- Prisma에서 자체적으로 제공하는 이벤트 로그들을 알게 되었다.
    > query, info, warn, error 등 / Prisma Client 생성 시 로깅 레벨 지정 가능
- 전역 로깅 미들웨어를 구현하여 쿼리 소요 시간의 출력을 공통으로 적용할 수 있다. 
- Node.js 환경에서 N+1 문제가 왜 발생하고 어떻게 해결할 수 있는지 알게 되었다.
    > ORM으로 Prisma를 사용한다는 가정 하에, REST API를 개발할 때는 select 또는 include로 명시적으로 EAGER하게 쿼리를 불러오기 때문에 for문을 잘못 사용하는 등의 경우가 아니라면 N+1 문제는 거의 발생하지 않는다. 그러나, GraphQL을 아키텍처로 채택하는 경우 각 필드마다 리졸버가 독립적으로 실행되는 GraphQL의 특성으로 인해 N+1문제를 마주하게 될 수 있다. 이 때, 해결 방법은 DataLoader를 사용하는 것인데, Prisma의 경우 자체적으로 FluentAPI라고 칭하는 DataLoader를 제공한다.

- 각 ORM에 대한 경험이 적어 각 ORM의 특징이 잘 와닿지 않는 듯. 직접 적용해보고 익숙해질 필요가 있다.
- 페이징 방식과 관련해 기존 API 설계를 검토해볼 필요가 있어보인다.

## 🙌 느낀 점
- 7주차에 미들웨어에 대한 내용을 배우는 것 같은데, Node.js에 있어 굉장히 중요한 개념인 듯 싶어 잘 정리해두면 좋을 것 같다.
- 스프링부트는 JPA 기반이기 때문에, Express에는 여러 종류의 ORM이 존재한다는 게 되게 신기하게 다가왔던 듯 싶다.
- 서버 개발이 두번째라 그럴 수도 있긴한데, 확실히 스프링부트와 비교했을 때 API 개발이 유연하다(쉽다..?)는 느낌이 있다.