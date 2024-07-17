const passport = require('passport'); // passport 모듈 불러오기 (인증을 위한 미들웨어)
const localStrategy = require('passport-local').Strategy; // 로컬 전략 불러오기 (이메일과 비밀번호 기반 인증)
const bcrypt = require('bcrypt'); // bcrypt 모듈 불러오기 (비밀번호 해싱 및 비교)

const User = require('../models/user'); // User 모델 불러오기 (데이터베이스와 상호작용)

module.exports = () => {
    // passport에 로컬 전략을 등록
    passport.use(new localStrategy({
        usernameField: 'email', // 요청에서 사용할 사용자 이름 필드 지정
        passwordField: 'passport', // 요청에서 사용할 비밀번호 필드 지정
        passReqToCallback: false, // 추가 요청 객체를 콜백에 전달하지 않음
    }, async (email, passport, done) => {
        try {
            // 이메일로 사용자 검색
            const exUser = await User.findOne({ where: {email} });
            if (exUser) { // 사용자가 존재하면
                // 입력된 비밀번호와 저장된 비밀번호 비교
                const result = await bcrypt.compare(password, exUser.password);
                if (result) { // 비밀번호가 일치하면
                    done(null, exUser); // 사용자 정보와 함께 정보와 함께 성공적으로 인증
                } else {
                    done(null, false, { message: '비밀번호가 일치하지 않습니다.'}); // 비밀번호 불일치
                }
            } else {
                done(null, false, { message: '가입되지 않은 회원입니다.'}); // 사용자가 존재하지 않음
            }
        } catch (error) { // 오류 발생시
            console.error(err); // 오류를 콘솔에 출력
            done(error); // 오류를 done 콜백으로 전달
        }
    }));
};