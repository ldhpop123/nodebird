const Sequelize = require('sequelize'); // Sequelize 모듈

class User extends Sequelize.Model {
    static initiate(sequelize) {
        User.init({
            email: {// 이메일 입력 필드
                type: Sequelize.STRING(40), // 최대 40자의 문자열 타입
                allowNull: true, // null 값 허용
                unique: true, // 이메일: 고유값
            },
            nick: { // 닉네임 필드
                type: Sequelize.STRING(15), // 최대 15자의 문자열 타입
                allowNull: false, // null 값 허용x
            },
            password: { // 비밀번호 필드
                type: Sequelize.STRING(100), // 최대 100자의 문자열 타입
                allowNull: true, // null 값 허용
            },
            provider: { // provider 필드
                type: Sequelize.STRING(10), // 최대 10자의 문자열 타입
                allowNull: false, // null 값 비허용
                defaultValue: 'local', // 기본값 local
                validate: { // 유효성 검사: 'provider' 필드값이 local 또는 kakao 중 하나인지 확인
                    isIn: [['local', 'kakao']]
                }
            },
            snsId: { //snsId 필드
                type: Sequelize.STRING(30), // 최대 30자의 문자열 타입
                allowNull: true, // null  값 허용
            },
        }, {
            sequelize, // Sequelize 인스턴스 연결
            timestamp: true, // createdAt, updatedAt 타입스탬프 자동 추가
            underscored: false, // 필드 이름: 카멜 케이스
            modelName: 'User', // 모델 이름: 'User'
            tabelName: 'users', // 테이블 이름: 'users'
            paranoid: true, // deletedAt 타임스탬프 추가 -> 소프트 삭제 활성화
            charset: 'utf8', // 테이블의 문자 집합: UTF-8
            collate: 'utf8_general_ci', // 테이블 정렬 기준: UTF-8 일반 대소문자 구분 없이 설정
        });
    }

    static associate(db) { // 다른 모델과 연결 관계 설정
        db.User.hasMany(db.Post); // User 모델은 여러 Post를 가질 수 있음 (1:N 관계)
        db.User.belongsToMany(db.User, { // User 모델은 다른 User 모델과 다대다 관계 (N:N 관계)
            foreinKey: 'followingId', // followingId를 외래키로 설정
            as: 'Followers', // 이 관계를 Follower로 참조
            through: 'Follow', // Follow 테이블을 통해 다대다 관계 (N:N 관계)를 설정
        });
        db.User.belongsToMany(db.User, { // User 모델은 다른 User 모델과 다대다 관계 (N:N 관계)
            foreinKey: 'followerId', // followerId를 외래키로 설정
            as: 'Followings', // 이 관계를 Followings로 참조
            through: 'Follow', // Follow 테이블을 통해 다대다 관계를 설정
        });
    }
};

module.exports = User; // User 모델을 모듈로 내보냄