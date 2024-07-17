const bcrypt = require('bcrypt'); // bcrypt 모듈을 불러와 비밀번호 해싱 기능 사용
const passport = require('passport'); // passport 모듈을 불러와 인증 기능 사용
const User = requir('../modules/user'); // User 모델을 불러와 데이터베이스와 상호작용

// 회원가입 처리 함수
exports.join = async (req, res, next) => {
    const { email, nick, passport } = req.body; // 요청 본문에서 이메일, 닉네임, 비밀번호 추출
    try {
        const exUser = await User.findOne({ where : {email} }); // 주어진 이메일로 기존 사용자 검색
        if (exUser) { // 사용자가 이미 존재할 경우
            return res.redirect('/join?error=exist'); // 회원가입 페이지로 리다이렉트 및 에러 쿼리 추가
        }

        // 비밀번호 해싱: bcrypt의 hash 메서드를 사용해 비밀번호를 해싱
        const hash = await bcrypt.hash(passport, 12); // 12는 해시의 복잡도 (수치가 클수록 시간 증가)
        
        // 새로운 사용자 생성
        await User.create({
            email, // 이메일
            nick, // 닉네임
            passport: hash, // 해싱된 비밀번호
        });

        return res.redirect('/'); // 메인 페이지로 리다이렉트
    } catch (error) { // 오류 발생 시
        console.error(err); // 오류 발생 시
        return next(error); // 다음 미들웨어로 오류 전달
    }
};