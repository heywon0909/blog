> 포트폴리오용 웹사이트를 개발하면서, 이미지 관련하여 성능 문제가 발생하였다. 해당 문제를 해결하면서 알게된 부분을 정리하였다.

포트폴리오용 웹사이트라 이미지 파일 개수가 다른 프로젝트에 비해 많이 있었다. info page에서 처음 화면이 렌더링될때 React Component들이 그려지는 속도보다 이미지 다운로드 시간이 오래 걸려 이미지가 늦게 나오는 현상이 발생하였다.

페이지 새로고침시, 로딩 UI 가 나오고 React Component가 마운트 되는 과정 속에서, 이미 사진을 포함한 컴포넌트가 먼저 그려지고, 이미지가 로드되고 있다.

![info page img](https://miro.medium.com/v2/resize:fit:640/format:webp/1*KjnmEHlAo5SEP4RL9EY6Ew.gif)

info 페이지에서의 이미지 느리게 로드됨
info 페이지에서는 프론트엔드 개발자(박혜원)에 대한 정보를 담고있는 페이지로, 각 컴포넌트가 로드되고 애니메이션 효과가 적용됨에 따라 관련 정보가 빠르게 표출되어야 한다.

이를 위해 프로필 이미지 로드 속도를 개선하였다.

1. 이미지 포맷
   png: 무손실 압축 방식(원본을 훼손하지 않고 압축), 용량을 획기적으로 저장하기에는 어려움이 있음, W3C 권장 포맷

- jpg: 가장 널리 쓰이는 이미지 포맷으로, png 와는 다르게 압축 과정에서 손실 발생(손실 압축), 하지만 용량을 그만큼 획기적으로 줄일 수 있음

- webp: 구글에서 개발한 .jpg,.png 대체 가능한 이미지 포맷, 무손실 압축 손실압축 모두 지원, Webp 방식은 PNG 대비 26%, JPG 대비 25–34% 더 나은 효율을 가지고 있음, 크로스 플랫폼에서는 Webp는 완전히 호환이 되지 않는다는 점을 유의하자

해당 이미지 파일 포맷은 png로 Squoosh를 통해 Webp로 이미지를 포맷하였다. Webp를 쓸때, 유의할 점은 특정 브라우저에서는 제대로 렌더링되지 않을 수 있으므로 picture태그를 사용해야만 하며, Webp를 지원하지 않을 시, 다른포맷을 지원하는 대체 이미지가 있어야 Webp 이미지렌더링 오류 발생 시, 대체 이미지로 렌더링이 가능하다는 점이다.

```
 <picture>
    <source srcSet={heywon} type="image/webp"></source>
    <S.UserImg src={fallbackHeywon}></S.UserImg>
 </picture>
```

2. 사전 로딩

이미지의 Webp 추가로, 이미지가 그려지는 속도가 빨라졌지만 역시나 이미지 태그를 감싸는 컴포넌트 렌더링 시점에 맞춰 이미지가 로드되는 것에는 어려움이 있었다. 이를 해결하기 위해 이미지 로드 시점을 앞으로 당겨, 이미지가 필요한 시점에 이용할 수 있도록 사전 로딩을 적용하였다.

useEffect 내에서 자바스크립트에 이미지를 직접 로드하도록 하여, mount 되는 시점에 적용될 수 있도록 하였다.

```
useEffect(() => {
const img = new Image()
img.src = heywon
}, [])
```

![빠른 4G에서 이미지 로딩 속도 확인해보기](https://miro.medium.com/v2/resize:fit:640/format:webp/1*RDFl2fxVQhtTYLx4x8IgMA.gif)

실제로 테스트를 해보니 이미지를 빠르게 불러오는 것을 확인할 수 있었다.

이외에도 해당 페이지에서는 존재하지만, 스크롤을 내려야 볼 수 있는 이미지가 총 5개 정도 존재하였다.

해당 이미지들은 초기 페이지 로드시에 쓰이는 이미지가 아니고, 일정 스크롤 범위에서 보여주는 것이 네트워크 사용량을 줄일 수 있을 거라 생각하여 img 태그에 loading=”lazy”를 적용하였다.

loading=”lazy”

해당 속성을 적용하면, 초기 페이지 렌더링 시에는 관련 이미지를 요청하지 않다가 이미지가 보여질 수 있는 일정 뷰포트 범위 내에 들어오면 이미지를 로드한다.

![img load 네트워크 확인](https://miro.medium.com/v2/resize:fit:720/format:webp/1*OdxvPi1QwQjILfBh4WEORA.png)

네트워크 요청을 확인해보니, loading=”lazy” 걸린 project-bunney, project-eslint, project-game, project-audio 이미지가 초기 페이지 렌더링 그 이후에 로드 되는 것을 확인할 수 있었다.

네트워크 요청에서 project- 관련 이미지들에 Webp 포맷을 적용한 것을 확인해볼 수 있다. Webp 포맷 적용 전과 후를 살펴보면, Webp 의 압축률이 이미지 로드속도를 얼마나 개선하는지를 파악할 수 있다.

![webp 적용 전과 후](https://miro.medium.com/v2/resize:fit:720/format:webp/1*9txi5wBhqGhvg0J58QiTAQ.png)

---

### 출처

https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Lazy_loading

https://stackoverflow.com/questions/24025464/lazy-loading-html5-picture-element?source=post_page-----0f87210b6cae---------------------------------------
