> Vite에 대해 공부하면서 알게된 내용을 정리한 문서입니다. 😎

### Vite란

Vite는 모듈 번들러가 아닌 build tool이다.

Vite에 대해 간략하게 정리해보자면, 🔎

1. 개발환경에서의 vite는 esbuild를 활용하여 코드를 esm 모듈 형식으로 변환한다.

2. 배포 환경에서의 vite는 rollup 을 활용하여 코드를 번들링한다.

3. vite의 사전 번들링

---

### ESM이란

JavaScript의 공식 모듈 시스템으로, import 와 export 키워드를 사용하여 모듈간의 의존성을 관리한다. 브라우저에서는 ES Modules를 <script type=”module”>을 사용하여 HTML에 직접 로드할 수 있도록 내부적으로 지원한다.

Vite에서는 개발서버에서 esbuild를 활용하여 esm 형식으로 파일을 변환한다.

## Vite에서 ESM이란

- 브라우저가 index.html을 요청하면 Vite는 해당 파일을 제공한다.
- index.html 내부의 <script type=”module”> 태그에 의해 브라우저는 import 키워드로 참조된 ESM 파일들에대해 개별적으로 HTTP 요청을 보낸다. => 이러한 파일들은 code splitting을 통해 독립된 ESM 모듈로 관리된다.
- Vite는 요청된 모듈 파일들을 실시간으로 변환 및 제공하며, 개발 환경에서는 번들링 과정을 거치지 않는다. => Vite는 ESM 형식이 아닌 파일들에 대해 esbuild를 활용하여 ESM 형식으로 변환해서 제공한다.

## 사전번들링

처음 vite를 실행할 때, 로컬에서 사이트를 불러오기 전에 package.json의 dependencies 목록을 읽고, node_modules 에서 해당 의존성들을 가져온다. 해당 의존성 라이브러리를 esbuild를 활용하여 esm 형식으로 변환하여 .vite/deps 폴더에 캐싱한다.

많은 의존성 라이브러리들이 CommonJs,UMD 형식으로 되어있으므로 ESM으로 변환한다. 또한 lodash-es 처럼 600개의 모듈을 가지고 있는 경우, 브라우저에서 600개의 모듈에 대한 HTTP 요청을 보내야하므로 매우 비효율적이다. 이를 해결하기위해 lodash-es 와 같은 모듈을 하나의 ESM 모듈로 묶는다.

.vite/deps 폴더에 ESM 파일들을 캐싱하므로, 브라우저 캐싱(사전 번들링된 디펜던시에서는 max-age=31536000,immutable 설정된 HTTP 헤더를 사용함 )을 활용하여 개발 시 페이지를 다시 불러올 때 캐싱된 ESM 파일을 사용할 수 있게 된다.

## 빠른 HMR

> Hot Module Replacement로 모듈 전체를 다시 로드하지않고, 애플리케이션이 실행되는 동안 교환,추가 또는 제거한다.

개발 시, 파일이 수정되었을 경우 번들링 과정을 다시 거치는 다른 모듈 번들러(webpack, Rollup) 와 다르게 vite는 변경된 파일에 관해서만 esbuild를 활용하여 수정된 부분을 반영해 ESM 형식으로 변환한다.

즉, Vite가 다른 모듈번들러보다 빠른 HMR을 제공할 수 있는 이유는 전체적인 번들링 작업 대비 수정된 파일에서만의 변환 작업이 시간적으로 더 빠르기 때문이다.

## 브라우저의 ESM 지원

vite가 모듈 시스템으로 ESM을 채택한 이유는 뭘까? 바로 브라우저의 ESM 형식 지원에 있다.

브라우저는 ESM에 대해 자동으로 캐싱을 수행하여, 변경되지 않은 파일을 다시 로드할 수 있다. 브라우저는 ESM을 지원하므로 각 모듈을 필요할 때만 개별적으로 로드할 수 있다.

![native esm based dev server](https://miro.medium.com/v2/resize:fit:720/format:webp/1*as3yFphFmC-LJXaIm_fEIA.png)

## 빌드 최적화

도대체 Vite는 어떻게 webpack,Rollup 보다 빌드 최적화를 할 수 있는 걸까

### css 코드 분리

vite는 비동기적으로 불러와지는 청크 내에 CSS 코드를 자동으로 추출하여 분리한다. 이후 해당 청크를 로드할 때 <link> 태그를 이용해 분리된 css를 불러와 css가 작업이 이뤄진 후, 해당 청크를 렌더링하도록 하여 css 렌더링 전에 화면이 먼저 그려져 css가 입혀질때 화면이 깜빡였다가 입혀지는 FOUC현상을 회피할 수 있다. 즉, css가 렌더링 된 후, 화면이 그려지게 된다.

### 비동기 청크 로딩 최적화

공통 청크 파일, 즉 브라우저에서 A와 B모듈을 필요로 하는데 A와 B모듈은 C모듈을 필요로한다. 이런 상황에서, A나 B모듈이 불러와지고 파싱이 된후에야 C청크가 필요하다는 사실을 확인하여 C파일에 대한 네트워크 요청이 비로 소 이뤄지게 된다.

vite에서는 Preload를 활용해 A가 필요할때 C도 병렬적으로 가져올 수 있도록 preload하여 네트워크 왕복을 줄 일 수 있도록 한다.

### Rollup을 활용한 최적화

Vite는 build 시에 Rollup을 활용하여 code splitting, tree-shaking 등 최적화 작업을 진행한 한다. 이를 통해 불필요한 코드가 포함되지 않도록 하고, 모듈을 분할하여 필요한 부분만 로드하도록 한다.

### esbuild를 통한 압축(\*이는 esbuild를 build 압축 option으로 설정해야만 가능)

이후 esbuild는 Rollup이 만든 chunk 파일들을 압축하고 난독화를 한다.esbuild는 파일 크기 축소와 속도에서 매우 뛰어나며, 특히 변수명 축소, 주석 제거, 불필요한 공백 제거등으로 배포 파일의 크기를 줄인다.esbuild 는 압축 과정을 빠르게 처리하여 최종 빌드 시간을 단축한다.

이외에도,

### Vite의 기본 최적화 옵션

Vite는 추가적인 설정없이도 기본적으로 빌드 프로세스에 적용될 수 있다.아래 옵션들은 기본값으로 최적화되어있어 사용자가 별도의 설정을 하지 않아도 최적화된 값으로 제공된다.

https://ko.vite.dev/config/build-options.html?source=post_page-----2bb61d1b2f4b---------------------------------------

### Vite의 css 자동 분리

Vite는 css 코드를 자동으로 분리해준다. link 태그를 이용해 분리된 css를 불러오도록하여 css 가 계산이 된 후에 모든 청크를 렌더할 수 있도록 한다. 이를 통해 FOUC 현상을 방지할 수 있도록 해준다.

### Vite의 동적 import 최적화

Vite는 동적 import 를 사용할때 필요한 공통 모듈을 preload하도록 하여 네트워크 왕복을 줄이고, 병렬적으로 로드할 수 있도록 한다.

> esbuild란
> Go로 만들어진 자바스크립트 번들러이다. Go라는 언어로 작성되어 멀티스레딩을 활용하여 빠른 속도로 빌드할 수 있게 해준다.

### Vite에서 esbuild

빠른 속도를 자랑하는 esbuild를 production 에서 번들러로 사용하지 않는가..

esbuild가 빠른 속도로 일을 해내는 장점이 있지만, Vite의 현재 plugin과 esbuild가 호환이 되지 않으므로 번들러로 esbuild 대신 rollup을 채택하고 있다.

이외에도 esbuild는 development,production에서 typescript 를 javascript로 transpile 하는데 사용한다. 이는 기본 TS 컴파일러인 tsc보다 약 20–30배 빠르다.

production 에서는 build 설정 option으로 esbuild를 선택하여build.minify, build.cssMinify에서 압축을 진행할 수 있다. esbuild를 선택하지 않으면, 다른 값을 사용하여 압축을 진행할 수 있다.

---

### 출처

https://ko.vite.dev/?source=post_page-----2bb61d1b2f4b---------------------------------------

https://nyagm.tistory.com/268?source=post_page-----2bb61d1b2f4b---------------------------------------
