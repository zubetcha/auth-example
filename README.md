# react 회원가입 & 로그인 구현 예제

### API

본 예제에서 사용한 API는 실제 데이터베이스를 이용한 것이 아닌 임시의 정적인 json 데이터를 사용합니다. 또한 API는 단순 통신 구현만을 목적으로 하여 Nextjs의 [API Routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)로 구현되어 있으며, 일반적인 서비스에서 개발하는 API보다 완성도가 현저히 떨어집니다. 따라서 실제 프로젝트에서 구현하는 API와는 설정 및 환경 등이 다를 수 있습니다.

### 페이지 라우팅

Nextjs를 사용한 예제이기 때문에 페이지 라우팅 시 Nextjs의 라우팅 훅을 사용하고 있습니다. React만 사용한다면 [react-router-dom](https://reactrouter.com/en/main/hooks/use-navigate)이 제공하는 훅을 사용하시면 됩니다.

### react-hook-form

폼 요소가 많으면 많아질수록 상태관리는 더욱 복잡해질 수 밖에 없습니다. [react-hook-form](https://www.react-hook-form.com/)은 이런 복잡한 폼 관련 상태들을 간편하게 관리할 수 있도록 도와주는 라이브러리입니다.
