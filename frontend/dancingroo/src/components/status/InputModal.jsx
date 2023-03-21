import React,{
    // useEffect, 
    useState} from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {Wrapper, Header, Main, Article, Section, H1,
    //  H2, 
     P, Footer} from "../common/ui/Semantics";
import musicNote from '../../assets/images/musicNote.png'

const ModWrapper = styled(Wrapper)`
    display:${({isModalOpen})=>isModalOpen? "flex":"none"};
    border:1px solid transparent;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    border-radius:10px;
    position: fixed;
    top: 0; bottom: 0; left: 0; right: 0;
    margin:auto;
    width: 70%;
    height: 85%;
    background-color: white;
    z-index: 2;
    letter-spacing:0.2rem;
`;
const ModMain = styled(Main)`
    flex-direction:column;
    height:25rem;
    width:90%;  
    /* border:1px solid black;  */
    justify-content:flex-start; 
`
const ModSection = styled(Section)`
    width:90%; 
    /* justify-content:flex-start;  */

`
const ModArticle = styled(Article)`
    flex-direction:column;
    /* border:1px solid red; */
    height:100%;
    width:90%;
    .row{
        height:50%;
        &>div{
            /* width:13rem; */
            /* border:1px solid black;  */
            justify-content:flex-start;
        }
    }
    &.title{ 
        max-width:20%;
        h3{
            color:#F05475;
        }
    }
    &.inputs{
        input{
            outline:none;
            border: 3px solid #F05475;
            border-radius:9px;
            width:6rem;
            margin-left:0.5rem;
            height:1.5rem;
            cursor: pointer;
            &.menu-input{
                width:25rem;
                height:2rem;
                margin-left:-5rem;
            }
        }
        &>div:first-child{
            justify-content:space-between;
            align-items:baseline;
            &>div{
                margin-right:3rem;
                /* &>input{
                    margin-top:0.1srem;
                } */
            }
        }
    }
    &.table{
        display:grid;
        grid-template-columns: repeat(3, 1fr);
        border:2px solid #F05475;
        /* grid-gap:3px; */
        border-radius:10px;
        height:15rem;
        position:relative;
        box-sizing:border-box;
        margin-top:0.8rem;
        .header{
            position:absolute;
            border-top-left-radius:10px;
            border-top-right-radius:10px;
            width:100%;
            height:3rem;
            background-color:#F05475;
            top:-1px;
            z-index:-1;
            box-sizing:border-box;
        }
        .main{
            height:100%;
            box-sizing:border-box;
            align-items:flex-start;
            position:relative;
            &.점심{
                border-left: 2px solid #F05475; border-right: 2px solid #F05475;
            }
            ${P}{
                color:white;
                position:absolute;
                top:-15px;
                /* border:1px solid black; */
                height:15%
            }
        }
    }
`
const ModFooter = styled(Footer)`
    &>button{
        background-color:#F05475;
        outline:none;
        border:none;
        border-radius:10px;
        min-width:5.5rem;
        min-height:2rem;
        color:white;
        letter-spacing:0.1rem;
        font-weight:500;
        font-size:1.2rem;
        cursor: pointer;
        box-shadow: 0px 3px 10px rgba(240, 84, 117, 0.3);
        transition: box-shadow 0.3s ease-in-out;
        &:hover{
            box-shadow: 0px 3px 15px rgba(240, 84, 117, 0.6);
        }
    }   
`
const Hightlight = styled.div`
    ${({selected})=> selected && `
        border:4px solid yellow;
    `}
    border-radius:15px;
    position:absolute;
    top: 0; bottom: 0; left: 0; right: 0;
    width:96%;
    height:96%;
    cursor: pointer;
`
const NoteImg = styled.img`
    z-index:-1;
    position:absolute;
    width:100%;
`

function InputModal(props) {
    const {handleIsModalOpen, isOpen} = props
    const [recentH, recentKg] = [181,78]
    const [selected, setSelected] = useState('아침')
    // const navigate = useNavigate();
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
    
    const handleSelected = (meal)=>{
        setSelected(meal)
    }
    return (
        <ModWrapper isModalOpen={isOpen}>
            <Header>
                <H1>{formattedDate} OO이 기록하기</H1>
            </Header>
            <ModMain>
                <ModSection className="title-inputs">
                    <ModArticle className="title">
                        <div className="row">
                            <h3>신체 정보</h3>
                        </div>
                        <div className="row">
                            <h3>식단 정보</h3>
                        </div>
                    </ModArticle>
                    <ModArticle className="inputs">
                        <div className="row">
                            <div>
                                <h4>키(cm)</h4>
                                <input type="text" placeholder={recentH}/>
                            </div>
                            <div>
                                <h4>몸무게(kg)</h4>
                                <input type="text" placeholder={recentKg}/>
                            </div>
                        </div>
                        <div className="row">
                            <input className="menu-input" type="text" placeholder="음식을 검색해보세요"/>
                        </div>
                    </ModArticle>
                </ModSection>
                <ModSection>
                    <ModArticle className="table">
                        <div className="header"/>
                        <div className="main 아침">
                            <P>아침</P>
                            
                            <Hightlight onClick={()=>handleSelected('아침')} selected={selected==='아침'}/>
                        </div>
                        <div className="main 점심">
                            <P>점심</P>
                            
                            <Hightlight onClick={()=>handleSelected('점심')} selected={selected==='점심'}/>
                        </div>
                        <div className="main 저녁">
                            <P>저녁</P>
                            
                            <Hightlight onClick={()=>handleSelected('저녁')} selected={selected==='저녁'}/>
                        </div>

                    </ModArticle>
                </ModSection>
            </ModMain>
            <ModFooter>
                <button onClick={()=>{
                    handleIsModalOpen()
                    setSelected('아침')
                }}>완  료</button>
            </ModFooter>
            <NoteImg src={musicNote}/>
        </ModWrapper>
    );
}

export default InputModal;