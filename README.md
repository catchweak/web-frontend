# Catch-Weak

이 프로젝트는 React.js 기반으로 구성되어있습니다.   
- [Create React App](https://github.com/facebook/create-react-app)으로 부트스트랩되었습니다.

## 사용 가능한 스크립트

프로젝트 디렉토리에서 다음 명령어를 실행할 수 있습니다:

### `npm start`

개발 모드에서 앱을 실행합니다.\
브라우저에서 [http://localhost:3000](http://localhost:3000) 를 열어 확인할 수 있습니다.

파일을 수정하면 페이지가 다시 로드됩니다.\
콘솔에 린트 오류도 표시될 수 있습니다.

### `npm test`

인터랙티브한 감시 모드에서 테스트 러너를 실행합니다.\
자세한 내용은 [테스트 실행](https://facebook.github.io/create-react-app/docs/running-tests) 섹션을 참조하세요.

### `npm run build`

프로덕션용 앱을 `build` 폴더에 빌드합니다.\
React를 프로덕션 모드로 올바르게 번들링하고 최상의 성능을 위해 빌드를 최적화합니다.

빌드가 최적화되었으며 파일명이 해시를 포함합니다.\
앱이 배포 준비되었습니다!

자세한 내용은 [배포](https://facebook.github.io/create-react-app/docs/deployment) 섹션을 참조하세요.

### `npm run eject`

**참고: 이 작업은 되돌릴 수 없습니다. `eject`를 실행하면 다시 돌아갈 수 없습니다!**

만약 빌드 도구 및 설정에 만족하지 못한다면 언제든지 `eject`를 실행할 수 있습니다. 이 명령어는 프로젝트에서 단일 빌드 종속성을 제거합니다.

대신 모든 구성 파일과 종속성을 프로젝트에 복사하여 완전한 제어권을 가질 수 있습니다.\
명령어를 실행한 후에도 모든 명령어는 여전히 작동하지만, 복사된 스크립트를 가리키게 됩니다. 이 시점에서 직접 스크립트를 수정할 수 있습니다.

## 주요 종속성

프로젝트에서 사용되는 주요 종속성은 다음과 같습니다:

### `axios`

- **설명**: 브라우저와 Node.js를 위한 Promise 기반 HTTP 클라이언트.
- **설치**: `npm install axios`
- **용도**: API 요청을 수행하는 데 사용됩니다.

### `react-router-dom`

- **설명**: React Router의 DOM 바인딩.
- **설치**: `npm install react-router-dom`
- **용도**: React 애플리케이션에서 라우팅을 처리하는 데 사용됩니다.

### `bootstrap`

- **설명**: 웹에서 반응형 모바일 우선 프로젝트를 개발하기 위한 인기 있는 프론트엔드 오픈 소스 툴킷.
- **설치**: `npm install bootstrap`
- **용도**: 반응형 디자인을 구현하는 데 사용됩니다.

### `react-icons`

- **설명**: 인기 있는 아이콘 패키지를 React 아이콘으로 가져오기 위한 라이브러리.
- **설치**: `npm install react-icons`
- **용도**: 애플리케이션에서 아이콘을 쉽게 사용합니다.

### 개발 종속성

프로젝트에서 사용되는 주요 개발 종속성은 다음과 같습니다:

### `@testing-library/react`

- **설명**: 좋은 테스트 관행을 장려하는 간단하고 완전한 React DOM 테스트 유틸리티.
- **설치**: `npm install @testing-library/react`
- **용도**: React 컴포넌트를 테스트하는 데 사용됩니다.

### `eslint`

- **설명**: JavaScript 코드에서 패턴을 식별하고 보고하는 도구.
- **설치**: `npm install eslint`
- **용도**: JavaScript 코드를 린트하여 코드 품질을 보장합니다.

### `eslint-config-react-app`

- **설명**: Create React App에서 사용되는 공유 가능한 ESLint 구성.
- **설치**: `npm install eslint-config-react-app`
- **용도**: Create React App 프로젝트의 ESLint 구성을 제공합니다.

### `web-vitals`

- **설명**: 주요 웹 성능 지표를 측정하기 위한 라이브러리.
- **설치**: `npm install web-vitals`
- **용도**: 웹 성능을 측정하는 데 사용됩니다.

## 프로젝트 구조

다음은 프로젝트 구조에 대한 간략한 개요입니다:

