![header](https://capsule-render.vercel.app/api?type=waving&color=auto&height=300&section=header&text=Lococo%20Project&fontSize=90)

<div align="center">
📚 <b>Tech Stack</b> 📚


✨ <b>Platforms & Languages</b> ✨

![image](https://img.shields.io/badge/react-61DAFB?style=flat&logo=react&logoColor=white)
![image](https://img.shields.io/badge/axios-5A29E4?style=flat&logo=axios&logoColor=white)
![image](https://img.shields.io/badge/styledcomponents-DB7093?style=flat&logo=styledcomponents&logoColor=white)
![image](https://img.shields.io/badge/bootstrap-7952B3?style=flat&logo=bootstrap&logoColor=white)

🛠 <b>Tools</b> 🛠


![image](https://img.shields.io/badge/github-181717?style=flat&logo=github&logoColor=white)
![image](https://img.shields.io/badge/visualstudiocode-007ACC?style=flat&logo=visualstudiocode&logoColor=white)
</div>



## 개요

#### 로코코프로젝트는 로스트아크 api를 활용하여 만든 웹 프로그램입니다.

캐릭터 이름을 검색하면 부족한 섬의 마음, 항해물을 볼 수 있습니다.<br/>
부족한 컨텐츠 보상을 구할 수 있는 캘린더 섬과 이벤트를 알 수 있습니다.<br/>
React로 제작되었으며 검색화면과 검색결과 화면 두가지로 분류되지만, SPA입니다.

## 기획

![image](https://github.com/choizia0724/LococoProject/assets/107836206/2cf0bf4f-f35a-45cf-a323-9ba28f14b60a)

스마일게이트 RPG에서는 게임 내부 데이터에 대해 OPEN API를 제공합니다.<br/>
해당 API로 전달받은 JSON데이터를 달력 API에 맞게 변조하여 사용자에게 필요한 정보를 제공합니다.<br/>
RPG 게임에서 필요한 이벤트를 실시간으로 조회할 수 있게 합니다.

## ViewTable

|검색|메인화면|
|---|---|
|![image](https://github.com/choizia0724/LococoProject/assets/107836206/7b4c4902-0067-4af3-90fd-e108b5164a30)|![image](https://github.com/choizia0724/LococoProject/assets/107836206/53f473de-6ec3-4c7a-9efa-6f3ebe1109b0)|
|상단 네비게이션의 캐릭터이름을 누르면 검색할 수 있습니다.|해당 캐릭터가 갖고있지 않는 컨텐츠보상을 볼 수 있습니다.|

##### *실제로 로스트아크 내에서 존재하는 캐릭터 명만 검색 가능합니다.

## Framework 설계
- @devexpress/dx-react-core,<br/>
  @devexpress/dx-react-scheduler,<br/>
  @devexpress/dx-react-scheduler-material-ui:
  DevExpress의 React 컴포넌트 라이브러리로, 특히 스케줄링 및 일정 관리 기능을 구현하기 위해 사용되었습니다. 이 라이브러리는 고급 UI 컴포넌트와 함께 일정, 예약 및 시간 관리를 위한 다양한 기능을 제공합니다.
- Axios:<br/>
  HTTP 클라이언트 라이브러리로, 서버와의 데이터 통신을 위해 사용되었습니다. RESTful API와의 상호작용에서 데이터 fetching 및 전송을 간편하게 처리합니다.
- Styled-components:<br/>
  CSS-in-JS 라이브러리로, 컴포넌트 수준에서 스타일을 관리합니다. JavaScript 코드 내에서 스타일을 정의하고, 동적 스타일링을 가능하게 합니다.

## 개발로직
1. main.jsx에서 param으로 전달받은 캐릭터 이름을 http api를 통해 조회합니다.
2. 실존하는 캐릭터 명의 경우 캐릭터 정보와, 수집품 정보를 분리하여 저장합니다.
3. 저장된 데이터는 props로 자식 컴포넌트에 전달됩니다. 실존하지 않는 경우 검색화면으로 되돌아 갑니다.
4. 전달된 컴포넌트는 컴포넌트에 맞춰 데이터가 변조됩니다. 특히, 달력 컴포넌트로 전달된 수집품 정보는 달력의 api에 맞게 데이터가 변조됩니다.
5. 이렇게 각자 전달된 데이터는 컴포넌트에 맞춰 사용자가 보기 편하게 적용됩니다.
