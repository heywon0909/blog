# Next.js Blog Project

Next.js를 학습하며 구현한 **정적 블로그 프로젝트**입니다.  
Markdown 기반의 게시글 렌더링과 코드 하이라이팅, 캐러셀 UI 등을 적용하여  
콘텐츠 중심의 블로그 구조를 구성하는 것을 목표로 했습니다.


## 프로젝트 목적

- Next.js(App Router)의 기본 구조와 렌더링 방식 이해
- 정적 페이지 기반 블로그 구현
- Markdown 콘텐츠 처리 및 코드 블록 렌더링 경험
- 서버 전용 로직(Server Action)을 활용한 이메일 전송 기능 구현


## 기술 스택

- **Framework**: Next.js
- **Language**: TypeScript
- **Rendering**: Static Rendering (SSG)
- **Styling**: tailwindcss 


## 사용 라이브러리

### Markdown & 콘텐츠 렌더링
- `react-markdown`  
  → Markdown 파일을 React 컴포넌트로 렌더링
- `remark-gfm`  
  → GitHub Flavored Markdown 지원 (table, checklist 등)
- `react-syntax-highlighter`  
  → 코드 블록 문법 하이라이팅 적용

### UI
- `react-multi-carousel`  
  → 반응형 캐러셀 UI 구현

### Server / Email
- `nodemailer`  
  → Server Action을 활용한 이메일 전송 기능 구현


## 주요 기능

- 📄 **Markdown 기반 게시글 렌더링**
  - Markdown 파일을 사용해 블로그 글 관리
  - 코드 블록 문법 하이라이팅 지원

- 🧩 **정적 페이지 기반 블로그 구조**
  - Next.js의 정적 렌더링 방식을 활용한 페이지 구성
  - 빌드 시점에 콘텐츠 생성

- 🎠 **캐러셀 UI**
  - 게시글 또는 콘텐츠를 캐러셀 형태로 노출

- ✉️ **이메일 전송 기능**
  - Next.js Server Action을 사용한 서버 전용 로직
  - Nodemailer를 통해 메일 전송 처리
  - 클라이언트 번들에 서버 로직이 포함되지 않도록 분리




## 실행 방법

```bash
npm install
npm run dev
