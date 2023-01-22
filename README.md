# 초성 편지

## ✉️ ㅊㅅㅍㅈ?

**초성 편지** 는 초성으로 비밀스럽게 편지를 주고 받을 수 있는 서비스에요.

- 개인 링크를 공유해서 편지를 주고 받을 수 있어요.
- 보낸 편지는 초성으로 변환되어 보여요.
- 하루에 5번 정답을 맞춰볼 수 있고, 기회는 다음 날 리셋돼요.

🔗 바로가기

- [초성 편지 서비스 Link](https://roundshoulder.github.io/cs-letter-frontend/)
- [공지 Notion Link](https://chosung-letter.notion.site/1dcc2f838fab47eeb47c97787077ab9f)

<br/>

## 🥕 Summary

<table>
  <tr>
    <th>Type</th>
    <td>Static web page</td>
    <td></td>
  </tr>
  <tr>
    <th>Version 1.0</th>
    <td>2022.12.18 ~ 2022.12.25</td>
    <td>서비스 개발</td>
  </tr>
  <tr>
    <th>Role</th>
    <td>Frontend</td>
    <td><a href='https://github.com/da-in'>da-in</a></td>
  </tr>
</table>

<br/>

## 🔧 Stack

<div>
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white">
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black">
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=Axios&logoColor=white">
  <img src="https://img.shields.io/badge/React Query-FF4154?style=flat-square&logo=React Query&logoColor=white">
  <img src="https://img.shields.io/badge/👩‍🎤Emotion/css-D26AC2?style=flat-square&logoColor=white">
  <img src="https://img.shields.io/badge/Github Actions-222222?style=flat-square&logo=Github&logoColor=white">
  <img src="https://img.shields.io/badge/Amazon S3-569A31?style=flat-square&logo=Amazon S3&logoColor=white">
</div>

<br/>

## 📖 File Structure

```
📂.github
 ┣ 📂workflows
📂public
📂src
 ┣ 📂api
 ┃ ┣ 📂auth
 ┃ ┃ ┣ index.ts
 ┃ ┃ ┗ types.ts
 ┃ ┣ 📂message
 ┃ ┃ ┣ index.ts
 ┃ ┃ ┗ types.ts
 ┃ ┣ 📂user
 ┃ ┃ ┣ index.ts
 ┃ ┃ ┗ type.ts
 ┃ ┣ client.ts
 ┃ ┗ oauth.ts
 ┣ 📂assets
 ┃ ┗ Theme.ts
 ┣ 📂components
 ┣ 📂hooks
 ┣ 📂pages
 ┣ App.tsx
 ┣ index.css
 ┗ index.tsx
```
