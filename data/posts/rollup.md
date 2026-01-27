> CRA안의 rollup에 대해 알아보자. 해당 내용은 공식문서를 공부하면서 정리한 내용을 담고 있습니다.

### Rollup

- Rollup은 JavaScript 모듈 번들러이다.
  Rollup 공식 문서 내용을 살펴보면서 정리한 제일 중요한 내용은 🔎

- Rollup은 기본적으로 ESM 모듈을 기반으로 번들링한다.
- Rollup은 기본적으로 프로젝트내에서 ESM 모듈(라이브러리)를 사용하는 것을 권장한다.
  즉, Rollup은 ESM 모듈 시스템을 지원한다는 것이다. 😮

Rollup이 ESM 모듈을 통해 code splitting 과 tree shaking을 통해 모듈을 최적화에 유리하므로 ESM 모듈을 사용한다.

## code splitting

output.manualChunks 옵션을 사용하면 명시적으로 별도의 청크 파일을 만들 수 있다.

동적 import 를 사용하여 코드 분할(lazy loading)이 가능하다.

```
// src/main.js
export default function () {
import('./foo.js').then(({ default: foo }) => console.log(foo));
}
```

output.chunkFileNames와 output.entryFileNames 옵션을 사용하면, 생성된 청크 파일들의 이름 패턴을 정의할 수 있다.

또한 Rollup에서는 여러 entry 파일에서 동일한 번들을 공유할 시, 공유된 청크로 만들어 중복 번들을 생성하지 않도록 한다.

## Tree Shaking

esm은 CommonJS 보다 필요한 모듈만을 선택적으로 로드하고, import 할 수 있어 성능적으로 우수하다.

반면 CommonJS는 동적(require)특성을 가지고 있어, 전체 라이브러리를 가져와야하는 특성이 있어 성능적으로 불리하다.

Rollup은 기본적으로 ESM(ES Modules)를 사용하지만 필요에 따라 CommonJS나 UMD 와 같은 포맷으로 번들링이 가능하다.

Rollup의 여러 특징들… 📑

1. package.json 속성에 따라 ESM, CommonJs 방식으로 빌드 가능하다

- main 속성: CommonJS 또는 UMD 형식의 번들 파일을 참조.
- module 속성: ESM 형식의 번들 파일을 참조.

2. Rollup에서 CommonJS 모듈을 사용하고 싶다면, @rollup/plugin-commonjs와 @rollup/plugin-node-resolve를 사용하여 rollup이 commonJS 모듈을 다룰 수 있도록 지원해야 한다.

3. Rollup은 다양한 옵션과 플러그인을 제공하여 사용자가 원하는 대로 빌드 과정을 custom 화 할 수 있도록 해준다.

4. vite와 WMR은 Rollup을 기반으로 한 빌드 도구이다. 즉, 이 두 도구가 Rollup을 자신들의 빌드 시스템에서 채택하여 쓰고 있다.

---

### 출처

https://rollupjs.org/?source=post_page-----23c1d2907272---------------------------------------
