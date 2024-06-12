import { useContext, useEffect, useRef, useState } from "react";
import "../../css/ldh/login/header.css";
import "../../css/ldh/login/main.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../apis/ldh/apiuser";
import { userInfoContext } from "../../context/UserInfoProvider";

const LogIn = ({ setOnHeader }) => {
  const { isUser, setIsUser } = useContext(userInfoContext);
  const navi = useNavigate();
  const [isId, setIsId] = useState("");
  const [isPass, setIsPass] = useState("");
  const [noneId, setNoneId] = useState("");
  const [nonePass, setNonePass] = useState("");
  // const noneId = useRef(null);
  // const nonePass = useRef(null);
  const cleanPass = useRef(null);
  const cleanId = useRef(null);

  const cleanUpId = () => {
    setIsId("");
  };
  const cleanUpPass = () => {
    setIsPass("");
  };
  const handleOnSubmit = async e => {
    e.preventDefault();
    const reqData = {
      uid: isId,
      upw: isPass,
    };
    const result = await postLogin(reqData);
    if (result.statusCode === 1) {
      alert("aaa");
      console.log(result.resultData.userId);
      console.log(result.resultMsg);
      console.log(isUser);
      setIsUser(result.resultData.userId);
      localStorage.setItem("user", result.resultData.userId);
      setOnHeader(true);
    }
    if (result.statusCode === -1) {
      console.log(result.resultMsg);
      setNoneId(result.resultMsg);
    }
    if (result.statusCode === -2) {
      console.log(result.resultMsg);
      setNonePass(result.resultMsg);
    }
  };

  useEffect(() => {
    setOnHeader(false);
    setNoneId("");
    setNonePass("");
    isId
      ? (cleanId.current.style.display = "block")
      : (cleanId.current.style.display = "none");
    isPass
      ? (cleanPass.current.style.display = "block")
      : (cleanPass.current.style.display = "none");
    return () => {};
  }, [isId, isPass]);

  return (
    <div className="wrap">
      <header className="header">
        <div className="header-inner">
          <div className="header-inner-home">
            <span>홈으로</span>
          </div>
        </div>
      </header>
      <main className="login-main">
        <div className="main-inner">
          <div className="main-content">
            <div className="main-content-login">
              <form className="idform" onSubmit={e => handleOnSubmit(e)}>
                <div className="input-id">
                  <img
                    src="/ldh/images/1564534_customer_man_user_account_profile_icon.svg"
                    className="profileico"
                  />
                  <div className="id-inner">
                    <input
                      type="text"
                      placeholder="아이디"
                      className="uid"
                      value={isId}
                      onChange={event => {
                        setIsId(event.target.value);
                      }}
                    />
                  </div>
                  <img
                    src="/ldh/images/10758948_x_circle_icon.svg"
                    className="cleanupico-id"
                    ref={cleanId}
                    onClick={() => {
                      cleanUpId();
                    }}
                  />
                </div>
                <div className="input-pass">
                  <img
                    src="/ldh/images/3643767_key_keys_main_password_privilege_icon.svg"
                    className="keyico"
                  />
                  <div className="pass-inner">
                    <input
                      type="password"
                      placeholder="비밀번호"
                      className="password"
                      value={isPass}
                      onChange={e => {
                        setIsPass(e.target.value);
                      }}
                    />
                  </div>
                  <img
                    src="/ldh/images/10758948_x_circle_icon.svg"
                    className="cleanupico-pass"
                    ref={cleanPass}
                    onClick={() => {
                      cleanUpPass();
                    }}
                  />
                </div>
                <div className="message-inner">
                  <span className="none-id">{noneId}</span>
                  <span className="none-password">{nonePass}</span>
                </div>
                <button className="button">로그인</button>
              </form>
            </div>
            <div className="user-login-menu">
              <a href="#">
                <span>회원가입</span>
              </a>
              <a href="#">
                <span>아이디 찾기</span>
              </a>
              <a href="#">
                <span>비밀번호 찾기</span>
              </a>
            </div>
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
  );
};

export default LogIn;
