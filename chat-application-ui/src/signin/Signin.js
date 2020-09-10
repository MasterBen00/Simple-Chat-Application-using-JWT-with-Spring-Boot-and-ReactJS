import React, {useEffect, useState} from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBModalFooter,
    MDBNotification,
    MDBRow
} from "mdbreact";
import {login} from "../utils/ApiUtils";
import {useRecoilValue} from "recoil";
import {authSuccess} from "../atom/globalState";

const Signin = (props) => {

    const [loading, setLoading] = useState(false);
    const [test, setTest] = useState(localStorage.getItem("accessToken"));
    const toastMessage = useRecoilValue(authSuccess);

    console.log("toast message", toastMessage);

    let [payload, setPayload] = useState({
        userNameOrEmail: '',
        password: ''
    });

    let handleChange = (e) => {
        let name = e.target.name;
        payload[name] = e.target.value;
        setPayload(payload);
    }

    useEffect(() => {
        if (localStorage.getItem("accessToken") !== null) {
            props.history.push("/");
        }
    }, []);

    const onFinish = (values) => {
        values.preventDefault();
        setLoading(true);
        console.log("payload", payload);
        login(payload)
            .then((response) => {
                localStorage.setItem("accessToken", response.accessToken);
                props.history.push("/");
                setLoading(false);
            })
            .catch((error) => {
                // if (error.status === 401) {
                //     notification.error({
                //         message: "Error",
                //         description: "Username or Password is incorrect. Please try again!",
                //     });
                // } else {
                //     notification.error({
                //         message: "Error",
                //         description:
                //             error.message || "Sorry! Something went wrong. Please try again!",
                //     });
                // }
                setLoading(false);
            });
    };


    const renderNotification = () => {
        if (toastMessage === "success") {

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

        }

        else if(toastMessage === "failed") {
            return <></>
        }


    }




    return (
        <div>
            <MDBContainer>
                {renderNotification()}
                <MDBRow className="mt-3">
                    <MDBCol md="3"/>
                    <MDBCol md="6">
                        <div className="text-center text-info mt-3 mb-3">
                            <h2>Please sign in</h2>
                        </div>
                    </MDBCol>
                </MDBRow>
                <MDBRow className="mt-3">
                    <MDBCol md="3"/>
                    <MDBCol md="6">
                        <MDBCard>
                            <MDBCardBody>
                                <form onSubmit={onFinish}>
                                    <p className="h4 text-center py-4">Sign In</p>
                                    <MDBInput
                                        label="Your username"
                                        name="userNameOrEmail"
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
                                        label="Your password"
                                        name="password"
                                        icon="lock"
                                        group
                                        type="password"
                                        validate
                                        onChange={handleChange}
                                        required
                                    />

                                    <div className="text-center py-4 mt-3">
                                        <MDBBtn outline color="info" type="submit">
                                            Sign In
                                            <MDBIcon icon="sign-in-alt" className="ml-2" />
                                        </MDBBtn>
                                    </div>
                                    <MDBModalFooter className="mx-5 pt-3 mb-1">
                                        <p className="font-small grey-text d-flex justify-content-end">
                                            Not a member?
                                            <a href={"/signup"} className="blue-text ml-1">

                                                Sign Up
                                            </a>
                                        </p>
                                    </MDBModalFooter>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
};

export default Signin;
