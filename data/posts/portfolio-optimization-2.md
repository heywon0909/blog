> 포트폴리오용 웹사이트를 개발하면서, 폰트 및 이미지 로딩 관련하여 성능 문제가 발생하였다. 해당 문제를 해결하면서 알게된 부분을 정리하였다.

포트폴리오용 웹사이트의 특성상, 그동안 진행했던 프로젝트의 내용과 어느정도 디자인 감각이 들어가야 한다. (프로젝트와 개발자로서의 나 자신을 잘 설명할 수 있는..)

이를 위해, 각 기능과 역할에 맞는 폰트와 프로젝트 및 나에 대한 이미지가 필요했다. 개발적으로 어려움은 없었지만, 로딩중의 폰트, 이미지가 상당수가 늦게 로딩되어 깨지는 것을 느꼈다.

### 폰트 최적화

메인화면에서 렌더링될때 loading UI가 보여지고, 아래와 같은 글자와 bunny UI 캐릭터가 함께 보이도록 구성되어있다.

![logo](https://miro.medium.com/v2/resize:fit:720/format:webp/1*GsYDdObYtwIMlekU1rhqTw.png)

실제로 렌더링될때의 모습을 확인해 보면, 폰트렌더링에 많은 시간이 걸려 폰트가 적용되기전에 글자가 먼저 보이므로, 기본 폰트 적용뒤 폰트가 로드되면 이후 최종 폰트가 적용되는 모습을 띄고 있었다.

실제 네트워크 패널에서의 폰트 로드 시간이다.

![폰트 로드 시간](https://miro.medium.com/v2/resize:fit:720/format:webp/1*eJU5Ktq0Gi7m6nD9xLq5Og.png)

‘Hello I’m Heywon’ 에서 적용되는 폰트는 Kanit-ExtraBold로 69.8KB 이며 540밀리초가 걸렸다.

1. 폰트 적용 시점 제어하기
   해당 폰트는 크롬기준에서, 네트워크 속도를 낮추면 기본폰트 -> 커스텀 폰트 순으로 폰트의 변화를 살펴볼 수 있었다. 해당 메인페이지는 폰트에 적용된 애니메이션과 함께 폰트를 보여주는 화면으로 기본 폰트 -> 커스텀 폰트 순보다는 커스텀 폰트가 로드된 이후 적용된 폰트를 보여주는 것이 제일 적합하다고 생각했다.

### <폰트 변화로 발생하는 현상>

- FOUT: 폰트 로드되기 전, 기본폰트 -> 커스텀 폰트 순으로 폰트가 적용됨
- FOIT: 폰트 로드되기 전, 텍스트가 보여지지 않다가 커스텀 폰트가 적용된 텍스트로 보여짐
  - FOIT 방식으로, 텍스트에 적용하기 위해 CSS font-display 속성을 사용하였다.

- auto: 브라우저 기본 동작(기본 값)
- block:FOIT(timeout=3s)
- swap:FOUT

- fallback:FOIT(timeout=0.1s) / 3초 후에도 불러오지 못한 경우 기본 폰트로 유지, 이후 캐시

- optional:FOIT(timeout=0.1s) / 이후 네트워크 상태에 따라 기본 폰트로 유지할지 결정, 이후 캐시

출처: 프론트엔드 성능 최적화 가이드

```
@font-face {
font-family: 'Kanit-extrabold';
font-display: block;
src: url('/assets/fonts/subset-Kanit-ExtraBold.woff2');
}
```

이렇게 해당 kanit-extrabold 폰트의 font-display를 block으로 설정해주었다.

2. 폰트 포맷 변경하기

현재 홈페이지에 적용되어있는 폰트는 TTF 포맷이였다. 하지만 TTF 포맷은 파일크기가 매우커서, 매번 리소스를 다운로드해야하는 웹에서는 적합하지 않을 수 있다. 이를 위해 웹폰트롤 나온것이 WOFF,WOFF2이다. 하지만 브라우저에서 해당 포맷을 지원하지 않을 수 있다.

내 프로젝트의 특성상 Github에서 접근 가능하고, 많은 사용자가 웹을 통해 접근하므로 빠른 로딩 속도와 효율성을 위해 WOFF2,WOFF 폰트를 사용하도록 구현하였다.

이 폰트외에도 모든 폰트를 WOFF2,WOFF형식으로 지원하여, 브라우저에서 WOFF2를 지원하지 않으면, WOFF 형식으로 폰트를 적용할 수 있게 끔 수정하였다.

```
@font-face {
font-family: 'Poppins-black';
src: url('/assets/fonts/Poppins-Black.woff2') format('woff2'),
url('/assets/fonts/Poppins-Black.woff') format('woff');
}
```

![브라우저 호환성](https://miro.medium.com/v2/resize:fit:720/format:webp/1*21sy9G_VHSkSVfSO7Xy_dg.png)

3. 서브셋 폰트 사용

해당 폰트는 메인에서, ‘Hello I’m Heywon’ 이 부분에서만 적용되므로 69.4KB나 되는 해당 폰트의 모든 글자에 대한 정보를 가지고 있을 필요가 없다. 이를 해결하기 위해 Transfonter 서비스에서 ‘Hello I’m Heywon’ 에 대한 서비스 폰트를 생성하여 적용하도록 수정하였다.

## 결론

3가지 작업을 진행 후, 배포 환경에서 다시 테스트를 진행하였다.

![테스트](https://miro.medium.com/v2/resize:fit:720/format:webp/1*UBLgcwd479O2KzEprryoGw.png)

테스트를 해보니, 4.7KB에 337 밀리초로 Kanit-Extrabold 크기가 준것을 확인할 수 있었다. 이외에도 다른 폰트(ttf -> woff2) 들도 크기가 상당히 준것을 확인할 수 있었다. 실제로도 메인페이지가 그려지고, 폰트가 로드된 이후 폰트가 적용된 텍스트가 화면에 그려지는 것을 볼 수 있었다.

---

출처
https://hansanghoo.gitbooks.io/webfont_study/content/chapter1.html
https://web.dev/articles/optimize-webfont-loading?hl=ko&source=post_page-----c0dc1b040d2c---------------------------------------
