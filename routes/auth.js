const express = require('express'); // express 모듈 불러오기
const passport = require('passport'); // passport 모듈 불러오기

// 로그인 여부를 확인하는 미들웨어 불러오기
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
// 회원가입, 로그인, 로그아웃 컨트롤러 함수 불러오기
const {join, login, logout } = require('../controllers/auth');

const router = express.Router(); // express 라우터 객체 생성

// 회원 가입 요청을 처리하는 라우터
// POST /auth/join 경로로 들어오는 요청 처리
// 사용자가 로그인하지 않은 상태 -> 회원 가입 가능
router.post('/join', isNotLoggedIn, join);

// 로그인 요청을 처리하는 라우터
// POST /auth/login 경로로 들어오는 요청 처리
// 사용자가 로그인하지 않은 상태 -> 로그인 가능
router.post('/login', isNotLoggedIn, join);

// 로그아웃 요청을 처리하는 라우터
// GET /auth/logout 경로로 들어오는 요청 처리
// 사용자가 로그인한 상태 -> 로그아웃 가능
router.get('/logout', isLoggedIn, logout);

module.exports = router; // 라우터 객체를 모듈로 내보내기