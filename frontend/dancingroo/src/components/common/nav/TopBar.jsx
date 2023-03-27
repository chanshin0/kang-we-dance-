import React
// , {useState, useRef} 
from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector,useDispatch } from "react-redux";
import { childSelect } from "../../../store/userSlice";
import useLogout from "../../../hooks/auth/useLogout";
//logo
import logo from "../../../assets/images/logo.png"
import {RiUserFill} from "react-icons/ri";

const Wrapper = styled.div`
    /* background-color:gray; */
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: space-between;
    min-height:3rem;
    .bottom-line {
    width: 100vw;
    height: 2px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  }
`;
const Logo = styled.div`
    /* background-color:gold; */
    width: 12rem;
    height: 3rem;
    background-image:url(${logo});
    background-size:cover;
    cursor: pointer;
`
const BarContainer = styled.div`
    /* border: 1px solid black; */
    width:${props=>props.width}%;
    height: ${props=>props.height}%;
    display:flex;
    align-items:center;
    justify-content:${props=>props.justify};
    /* border:1px solid red; */
    .user-menu{
        /* border:1px solid blue; */
        display:flex;
        justify-content:space-between;
        width:6rem;
        align-items:center;
        /* margin-top:0.5rem; */
        &>div{
            cursor: pointer;
        }
    }
`

const LogOut = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.5rem;
  height: 1.3rem;
  font-size: 0.7rem;
  background-color: #ffd8e0;
  border-radius: 21px;
  text-align: center;
  font-weight: bold;
  color: white;
  border: 2px solid #ffd8e0;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #ff9aa2;
    border-color: #ff9aa2;
    cursor: pointer;
    font-weight: bolder;
    font-size: 0.8rem;
    width: 3.7rem;
    height: 1.5rem;
  }
`

function HeaderBar(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(state=>state.userState.isLoggedIn);
    const familyname = useSelector(state=>state.userState.familyname)
    const {isLoading, error, handleLogout} = useLogout()
    const API_KEY_KAKAO = process.env.REACT_APP_API_KEY_KAKAO;
    const LOGOUT_REDIRECT_URI = process.env.REACT_APP_LOGOUT_REDIRECT_URI

    const logoutHandler = ()=>{
        // 로그아웃처리하고, 카카오 로그아웃 후 홈으로 리다이렉트
        handleLogout()
        window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${API_KEY_KAKAO}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}&state=logout`
    }
    return (
        <Wrapper>
            <BarContainer height={100} justify={"space-between"} width={100}>
                <Logo onClick={() => {
                    dispatch(childSelect(0))
                    navigate("/play");
                }}
                    />
                <div className="username">
                    {isLoggedIn &&
                    `${familyname || '캥거루합창단'} 환영합니다!`
                    }
                </div>
                <div className="user-menu">
                    {isLoggedIn &&
                    <>
                    <LogOut onClick={logoutHandler}>로그아웃</LogOut>
                    <div
                    onClick={() => {
                        navigate(`/users`);
                    }}>   
                        <RiUserFill color="#F05475" size="2rem"/>
                    </div>
                    </>
                    }
                </div>
            </BarContainer>
            {/* <div className="bottom-line" /> */}
            <div className="bottom-line" />
        </Wrapper>
    );
}

export default HeaderBar;
