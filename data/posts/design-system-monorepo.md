이 글은 특정 프로젝트에 적용한 경험을 바탕으로, 개인적으로 정리한 내용을 담고 있습니다.  
실제 프로젝트와 무관하게 일반화된 설정만을 포함합니다.

---

회사에서 디자인 시스템을 개발하면서 이러한 문제에 직면했다.

- 디자인 시스템의 컴포넌트 변경, 수정 시 디자인 시스템 전체 version 업데이트를 해야 함
- 버전 변경 시 변경점 추적이 어려움, 관리가 어려움

이러한 문제를 해결하기 위해 다음과 같은 작업을 진행하였다.

- 모노레포로 전환
- changeset 도입

---

## 모노레포로 전환

변경하고 싶은 것은 다음과 같다.

- 모든 디자인 컴포넌트는 하나의 패키지다.
- 디자인 컴포넌트를 쓰고 싶을 때마다 install 하는 것은 번거로우니, 모든 디자인 컴포넌트를 감싸는 root 패키지를 배포한다.
- 하지만 우리의 모든 디자인 컴포넌트는 총 18개이고, 일일이 package.json을 만들어 주는 것은 버겁다고 생각했다.

그래서 scripts를 통해 의존성을 분석하여 `package.json`을 자동 생성하도록 빌드 스크립트를 작성하였다.

---

### pnpm-workspace.yaml

모든 package는 workspace이다.

```yaml
packages:
  - 'packages/**'
  - '.'
```

```
디자인 컴포넌트 패키지 예시
{
"name": "하나의 디자인 컴포넌트",
"version": "0.0.3",
"private": false,
"type": "module",
"main": "dist/admin.cjs",
"module": "dist/admin.js",
"types": "dist/index.d.ts",
"sideEffects": [
"./dist/*.css"
],
"files": [
"dist"
],
"scripts": {
"..."
},
"dependencies": {
"의존성 있는 다른 레포": "workspace:^"
},
"devDependencies": {
"..."
},
"peerDependencies": {
"무조건 외부에서 설치해야만 하는 모듈": "^x.y.z"
}
}
```

## Changeset

changeset은 멀티레포 패키지에서 버전 관리와 changelog를 관리하는 tool이다.

@changesets/cli 패키지의 역할

변경 사항이 생길 때마다 changeset 파일을 작성할 수 있고, 여러 개의 changeset을 하나의 release로 결합한다.

각 패키지에 대해 버전 증가 유형(bump-types)을 정리하여 하나의 release로 만든다.

멀티 패키지 레포지토리(monorepo)에서 내부 의존성 관계도 잘 처리해주고, changelog도 자동으로 업데이트한다.

변경된 모든 패키지를 한 번의 명령어로 배포할 수 있게 해준다.

준비 작업

먼저 @changesets/cli를 설치한다.

설치하면 .changeset 폴더가 생성된다.

changeset 설정은 다음 파일에서 할 수 있다.

```js
{
"$schema": "https://unpkg.com/@changesets/config@3.1.1/schema.json",
"changelog": "@changesets/cli/changelog",
"commit": false,
"fixed": [],
"linked": [],
"access": "restricted",
"baseBranch": "main",
"updateInternalDependencies": "patch",
"ignore": [],
"baseVersion": "0.0.0"
}
```

### 사용 방법

1. pnpm changeset 명령어를 통해 publish 하고 싶은 package를 선택한다.

- 이때 root 레포를 선택하지 않아도 자동으로 함께 배포된다.

(단, 하위 레포가 변경되었으므로 root 레포를 build 하는 작업을 미리 수행할 수 있도록 한다.)

2. 패키지를 선택하고 올릴 버전을 정한 뒤 summary를 작성한다.
   → .changeset 폴더에 새로운 md 파일이 생성된다.

```
pnpm changeset version
```

- 버전을 올리고 싶은 package 안에 changelog 파일이 생성되고, 작성한 md 내용이 추가된다.

```
pnpm changeset publish
```

3. 설정한 publish 주소로 패키지를 배포한다.

- 이 과정에서 tag version도 함께 생성된다.

- .npmrc를 통해 publish 주소를 관리한다.
  (이때 생성되는 tag는 local tag이므로, 검토 후 remote push 작업을 거쳐야 실제 tag로 반영된다.
  물론 local tag를 자동으로 push 하도록 설정할 수도 있지만,
  디자인 시스템을 관리하는 특성상 검토 후 remote push 하는 방식이 더 용이하다고 판단하였다.)

## 결과

버전 변경 시마다 changelog와 tag를 통해 변경점을 추적하기 쉬워졌다.

모든 패키지가 publish 되어 다소 과하다고 느껴질 수는 있다.

하지만 최종적으로는 root repo를 사용하는 것이 목적이므로, 이러한 방식으로 관리하는 것이 적절하다고 판단하였다.
