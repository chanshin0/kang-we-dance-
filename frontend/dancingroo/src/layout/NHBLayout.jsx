import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../components/common/nav/TopBar";
// import FooterBar from "../components/common/nav/FooterBar";
import styled from "styled-components";

const Bodysuit = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    position: relative;
    // @ 양 옆 마진
    margin:0 15% !important;
    z-index:2;
`;
const OutletWrapper = styled(Outlet)`
`

const HBLayout = () => {
    // const navigate = useNavigate();

    // useEffect(()=>{
    //     if(isLoggedIn){
    //         navigate("/");
    //     }
    // }, [isLoggedIn])

    return(
        <Bodysuit>
            <TopBar/>
            {/* <HeaderBar/> */}
            {/* <ChildProfile/> */}
            <OutletWrapper/>
            {/* <BottomBar/> */}
        </Bodysuit>
    )

}

export default HBLayout;
