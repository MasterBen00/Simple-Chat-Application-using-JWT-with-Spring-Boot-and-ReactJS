import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Signup from "./signup/Signup";
import Signin from "./signin/Signin";
import Profile from "./profile/Profile";
import {RecoilRoot} from "recoil";
import Chat from "./chat/Chat";

const App = (props) => {

    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={(props) => <RecoilRoot><Profile {...props} /></RecoilRoot>} />
                    <Route
                        exact
                        path="/login"
                        render={(props) => <RecoilRoot><Signin {...props} /></RecoilRoot>}
                    />
                    <Route
                        exact
                        path="/signup"
                        render={(props) => <RecoilRoot><Signup {...props} /></RecoilRoot>}
                    />
                    <Route exact path="/chat" render={(props) => <RecoilRoot><Chat {...props} /></RecoilRoot>} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
