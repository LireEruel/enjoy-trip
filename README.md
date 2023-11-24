# EnjoyTrip_Framework

## 프로젝트 세팅 정보
Spring Boot, Java 11, MySQL 8.0.23 

- **Java 11** macOS ARM64 DMG Installer 
  https://www.oracle.com/kr/java/technologies/javase/jdk11-archive-downloads.html
- **MySQL 8.0.23**  macOS 10.15 (x86, 64-bit), DMG Archive (8.0.23 / macOS)
  https://downloads.mysql.com/archives/community/
- **DBeaver** (MacOS for Apple Silicon (dmg)
  https://dbeaver.io/download/


## DB 설정
- 환경 : MySQL 8.0.23
- database 생성 : /DB/enjoytrip_ddl.sql 실행
- 초기 데이터 : /DB/Dump20231023 하위 sql 전체 실행

### Dump 파일 실행 순서
1. enjoytrip_sido.sql
2. enjoytrip_gugun.sql	
3. enjoytrip_attraction_type.sql	
4. enjoytrip_attraction_info.sql	
5. enjoytrip_attraction_detail.sql	
6. enjoytrip_attraction_description.sql	

## Vue + TypeScript + Ant Design Vue 템플릿 프로젝트

이 프로젝트는 Vue, TypeScript, 그리고 Ant Design Vue를 활용하여 개발된 템플릿 프로젝트입니다.

## 시작하기

### 필요 조건

- Node.js (v14.0 이상 추천)
- Yarn

### 설치 및 실행 방법

1. 저장소를 클론합니다.
   ```bash
   git clone [저장소 주소]
   ```
2. 필요한 모듈을 다운받습니다.
   ```bash
   yarn
   ```
3. 실행합니다.
   ```bash
   yarn dev
   ```

### ERD 이미지
![image](/uploads/cd39955d4abd7a83044b23bc2c03bfb0/image.png)

### API 설계서
![image](/uploads/3e8c2b7b3025661ca185d62984443c7f/image.png)
![image](/uploads/707fadfe4519b8013cbb3be11ef8944d/image.png)
![image](/uploads/a693ea26b23c5aad097e87f802312460/image.png)
![image](/uploads/0e3e0d0751b860cacb8e15e7fa2fadf3/image.png)
![image](/uploads/53d147e06a24071c986adfccb818669b/image.png)

### 클래스 다이어그램 
![image](/uploads/4a0415dbbf65adc7f997ec343092e6c9/image.png)
![image](/uploads/a54edfebe123ac51a4d592ce7a7f9b8e/image.png)
![image](/uploads/ae97dc2ea355252fc73c0285dfa52c63/image.png)
![image](/uploads/e54adbb98c76000baf69a7fa03c54f2a/image.png)
![image](/uploads/58337ff10eefa48fb6743b6c0919e99f/image.png)
![image](/uploads/08487bfe3ee4ed0214b2c3ae73d1b426/image.png)
![image](/uploads/f9f673e809a8f216a60f9f7a500efd21/image.png)
![image](/uploads/28be6d477aa9cec53e893555e2aceb34/image.png)
![image](/uploads/c7c70931fe1a03a5d2dbee3e178115ed/image.png)
![image](/uploads/25a4c08ad05b38f9caea2c389a05e12e/image.png)
![image](/uploads/3fbf2ada20c4a68cad7d4e54c4103e37/image.png)
![image](/uploads/7ba0df57c93ca295a286dca544d860c0/image.png)

## 시연 영상

### 회원가입, 로그인, 개인정보 수정
![회원관리](/uploads/c9a1a10170e1ff24e416b5c6ad6e20ab/회원관리.gif)

### 관광지
![관광지](/uploads/6bd2434fb94f52145a500bf1b7cd2e29/관광지.gif)

### 공지사항
![공지사항](/uploads/00e965ef32040e1453d627fa994c7ce7/공지사항.gif)

### 애인
![애인](/uploads/9396cc082919a37d9208617ca494e75b/애인.gif)

### 여행계획
![여행_계획](/uploads/73a63d48a5465d65b3304c26e73ce53c/여행_계획.gif)

### 여행계획
![여행후기](/uploads/2a662cf3f683946af84354c7207bff49/여행후기.gif)

### 채팅
![채팅](/uploads/e8717cb33768a177c06afe319ae5981e/채팅.gif)

