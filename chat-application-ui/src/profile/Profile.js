import React, {useEffect} from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardText,
    MDBCardTitle,
    MDBCol,
    MDBContainer, MDBIcon,
    MDBRow
} from "mdbreact";
import { useRecoilState } from "recoil";
import { loggedInUser } from "../atom/globalState";
import {getCurrentUser} from "../utils/ApiUtils";
import {Link} from "react-router-dom";

const Profile = (props) => {

     const [currentUser, setLoggedInUser] = useRecoilState(loggedInUser);
    console.log("in onconnected functionaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",localStorage.getItem("accessToken"));

    useEffect(() => {
        if (localStorage.getItem("accessToken") === null) {
            props.history.push("/login");
        }
        loadCurrentUser();
    }, []);

    useEffect(() => {
        console.log("updating");
        console.log(currentUser);
    }, [currentUser]);

    const loadCurrentUser = () => {
        getCurrentUser()
            .then((response) => {
                setLoggedInUser(response);
                console.log("after using callback function",currentUser);
            })
            .catch((error) => {
                console.log("error occured",error);
            });
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        props.history.push("/login");
    };

    return (
            <MDBContainer>
                <MDBRow className="mt-3">
                    <MDBCol md="3"/>
                    <MDBCol md="6">
                        <div className="text-center text-info mt-3 mb-3">
                            <h2>My Profile</h2>
                        </div>
                    </MDBCol>
                </MDBRow>
                <MDBRow className="mt-3">
                    <MDBCol md="3"/>
                    <MDBCol md="6">
                        <MDBCard>
                            <MDBCardImage className="img-fluid"
                                          src={currentUser.profilePicUrl}
                                          waves/>
                            <MDBCardBody>
                                <MDBCardTitle>{currentUser.username}</MDBCardTitle>
                                <MDBCardText>{currentUser.email}</MDBCardText>
                                <div className="text-center py-4 mt-3">

                                <MDBBtn onClick={logout} outline color="danger">
                                    Sign Out
                                    <MDBIcon icon="sign-out-alt" className="ml-2" />
                                </MDBBtn>

                                    <MDBBtn outline color="indigo" tag={Link} to="/chat">
                                        Start Chatting
                                        <MDBIcon icon="comments" className="ml-2" />

                                    </MDBBtn>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
    );
};

export default Profile;
