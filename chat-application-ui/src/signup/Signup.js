import React, {useEffect, useState} from "react";
import {notification} from "antd";
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBNotification, MDBRow} from 'mdbreact';
import {signup} from "../utils/ApiUtils";
import {useRecoilState} from "recoil";
import {authSuccess} from "../atom/globalState";

const Signup = (props) => {

    const [loading, setLoading] = useState("progress");
    const [toastMessage, setToastMessage] = useRecoilState(authSuccess);

    console.log(toastMessage);



    useEffect(() => {
        if (localStorage.getItem("accessToken") !== null) {
            props.history.push("/");
        }
    }, []);


    let [payload, setPayload] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        profilePicUrl: ''
    });



    let handleChange = (e) => {
        let name = e.target.name;
        payload[name] = e.target.value;
        setPayload(payload);
    }


    let createUser = (e) => {
        e.preventDefault();
        console.log("lol", payload);
        signup(payload)
            .then((response) => {
                setToastMessage("success");
                props.history.push("/login");
                setLoading("success");
            })
            .catch((error) => {
                setLoading("failed");
            });
    };


    const renderNotification = () => {
        if (loading === "success") {
            return <MDBContainer
                style={{
                    width: "auto",
                    position: "fixed",
                    top: "40px",
                    right: "40px",
                    zIndex: 9999
                }}
            >
                <MDBNotification
                    show
                    fade
                    icon="envelope"
                    iconClassName="green-text"
                    title="Success"
                    message="Thank you! You're successfully registered. Please Login to continue!"
                    text="just now"
                />
            </MDBContainer>

        } else if(loading === "failed") {
            return <MDBContainer
                style={{
                    width: "auto",
                    position: "fixed",
                    top: "40px",
                    right: "40px",
                    zIndex: 9999
                }}
            >
                <MDBNotification
                    show
                    fade
                    icon="envelope"
                    iconClassName="green-text"
                    title="Error"
                    message="Sorry! Something went wrong. Please try again!"
                    text="just now"
                />
            </MDBContainer>
        }
        else if(loading === "progress") {
            return <></>
        }


    }


    return (



        <MDBContainer className="mt-3">
            {renderNotification()}

            <MDBRow className="mt-3">
                <MDBCol md="3"/>
                <MDBCol md="6">
                    <div className="text-center text-info mt-3 mb-3">
                        <h2>Please sign up</h2>
                    </div>
                </MDBCol>
            </MDBRow>
            <MDBRow className="mt-3">
                <MDBCol md="3"/>
                <MDBCol md="6">
                    <MDBCard className="z-depth-2">
                        <MDBCardBody>
                            <form onSubmit={createUser}>
                                <p className="h4 text-center py-4">Sign up</p>
                                <div className="grey-text">
                                    <MDBInput
                                        label="Your first name"
                                        name="firstName"
                                        icon="user"
                                        group
                                        type="text"
                                        validate
                                        error="wrong"
                                        success="right"
                                        onChange={handleChange}
                                        required
                                    />
                                    <MDBInput
                                        label="Your last name"
                                        name="lastName"
                                        icon="user"
                                        group
                                        type="text"
                                        validate
                                        error="wrong"
                                        success="right"
                                        onChange={handleChange}
                                        required
                                    />
                                    <MDBInput
                                        label="Your username"
                                        name="username"
                                        icon="user"
                                        group
                                        type="text"
                                        validate
                                        error="wrong"
                                        success="right"
                                        onChange={handleChange}
                                        required
                                    />
                                    <MDBInput
                                        label="Your email"
                                        name="email"
                                        icon="envelope"
                                        group
                                        type="email"
                                        validate
                                        error="wrong"
                                        success="right"
                                        onChange={handleChange}
                                        required
                                    />
                                    <MDBInput
                                        label="Your password"
                                        name="password"
                                        icon="lock"
                                        group
                                        type="password"
                                        validate
                                        onChange={handleChange}
                                        required
                                    />
                                    <MDBInput
                                        label="Your profile image link"
                                        name="profilePicUrl"
                                        icon="camera"
                                        group
                                        type="text"
                                        validate
                                        error="wrong"
                                        success="right"
                                        onChange={handleChange}
                                        required

                                    />
                                </div>
                                {/*<div className="text-center py-4 mt-3">*/}
                                {/*    <MDBBtn color="cyan" type="submit">*/}
                                {/*        Register*/}
                                {/*    </MDBBtn>*/}
                                {/*</div>*/}

                                <MDBRow className='d-flex align-items-center mb-4 ml-4'>
                                    <MDBCol md='6' className='text-center'>
                                        <MDBBtn className='z-depth-1' type="submit" color='blue' rounded block>
                                            Sign up
                                        </MDBBtn>
                                    </MDBCol>
                                    <MDBCol md='6'>
                                        <p className='font-small grey-text d-flex ml-2 '>
                                            Have an account?
                                            <a href={'/login'} className='blue-text ml-1'>
                                                Log in
                                            </a>
                                        </p>
                                    </MDBCol>
                                </MDBRow>
                            </form>

                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default Signup;

