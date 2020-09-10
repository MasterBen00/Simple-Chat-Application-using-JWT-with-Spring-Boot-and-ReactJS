import React, {useEffect, useState} from "react";
import {Button, message} from "antd";

import {useRecoilValue, useRecoilState} from "recoil";
import {
    loggedInUser,
    chatActiveContact,
    chatMessages,
} from "../atom/globalState";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Chat.css";
import {countNewMessages, findChatMessage, findChatMessages, getCurrentUser, getUsers} from "../utils/ApiUtils";
import {MDBCol, MDBContainer, MDBNotification, MDBRow} from "mdbreact";

var stompClient = null;
const Chat = (props) => {
    let currentUser = useRecoilValue(loggedInUser);
    console.log("in onconnected functionddddddddddddddddddddddddddddddddddd", currentUser);
    const [text, setText] = useState("");
    const [contacts, setContacts] = useState([]);
    const [activeContact, setActiveContact] = useRecoilState(chatActiveContact);
    const [messages, setMessages] = useRecoilState(chatMessages);
    const [loading, setLoading] = useState("progress");

    useEffect(() => {
        if (localStorage.getItem("accessToken") === null) {
            props.history.push("/login");
        }
        connect();
        loadContacts();
    }, []);


    useEffect(() => {
        if (activeContact === undefined) return;
        findChatMessages(activeContact.id, currentUser.id).then((msgs) =>
            setMessages(msgs)
        );
        loadContacts();
    }, [activeContact]);

    const connect = () => {
        const Stomp = require("stompjs");
        var SockJS = require("sockjs-client");
        SockJS = new SockJS("http://localhost:8080/ws");
        stompClient = Stomp.over(SockJS);
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        console.log("connected");
        console.log("in onconnected function", currentUser);
        stompClient.subscribe(
            "/user/" + currentUser.id + "/queue/messages",
            onMessageReceived
        );
    };

    const onError = (err) => {
        console.log(err);
    };

    const onMessageReceived = (msg) => {
        const notification = JSON.parse(msg.body);
        console.log("notification", notification);
        // const active = JSON.parse(sessionStorage.getItem("recoil-persist"))
        //     .chatActiveContact;
        const active = JSON.parse(JSON.stringify(chatActiveContact));

        console.log("notification", active);

        if (active.id === notification.senderId) {
            findChatMessage(notification.id).then((message) => {
                // const newMessages = JSON.parse(sessionStorage.getItem("recoil-persist"))
                //     .chatMessages;
                const newMessages = JSON.parse(JSON.stringify(chatMessages));

                newMessages.push(message);
                setMessages(newMessages);
            });
        }
        else {
            setLoading("success");
        }
        // else {
        //     message.info("Received a new message from " + notification.senderName);
        // }
        loadContacts();
    };

    const sendMessage = (msg) => {
        if (msg.trim() !== "") {
            const message = {

                senderId: currentUser.id,
                recipientId: activeContact.id,
                senderName: currentUser.username,
                recipientName: activeContact.username,
                content: msg,
                timestamp: new Date(),
            };

            console.log("message", message);
            stompClient.send("/p/app/chat", {}, JSON.stringify(message));

            const newMessages = [...messages];
            newMessages.push(message);
            setMessages(newMessages);
        }
    };

    const loadContacts = () => {
        const promise = getUsers().then((users) =>
            users.map((contact) =>
                countNewMessages(contact.id, currentUser.id).then((count) => {
                    contact.newMessages = count;
                    return contact;
                })
            )
        );

        promise.then((promises) =>
            Promise.all(promises).then((users) => {
                setContacts(users);
                if (activeContact === undefined && users.length > 0) {
                    setActiveContact(users[0]);
                }
            })
        );
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
                    message="You have received a new message"
                    text="just now"
                />
            </MDBContainer>
        }
        else if(loading === "progress") {
            return <></>
        }


    }

    return (
        <MDBContainer>
            {renderNotification()}
            <MDBRow className="mt-3">
                <MDBCol md="2"/>
                <MDBCol md="8">
                    <div className="text-center text-info mt-3 mb-3">
                        <h2>Messenger</h2>
                    </div>
                </MDBCol>
            </MDBRow>
            <MDBRow className="mt-3">


                <div id="frame">
                    <div id="sidepanel">
                        <div id="profile">
                            <div className="wrap">
                                <img
                                    id="profile-img"
                                    src={currentUser.profilePicUrl}
                                    className="online"
                                    alt=""
                                />
                                <p>{currentUser.username}</p>
                                <div id="status-options">
                                    <ul>
                                        <li id="status-online" className="active">
                                            <span className="status-circle"/> <p>Online</p>
                                        </li>
                                        <li id="status-away">
                                            <span className="status-circle"/> <p>Away</p>
                                        </li>
                                        <li id="status-busy">
                                            <span className="status-circle"/> <p>Busy</p>
                                        </li>
                                        <li id="status-offline">
                                            <span className="status-circle"/> <p>Offline</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div id="search"/>
                        <div id="contacts">
                            <ul>
                                {contacts.map((contact) => (
                                    <li key={contact.id}
                                        onClick={() => setActiveContact(contact)}
                                        className={
                                            activeContact && contact.id === activeContact.id
                                                ? "contact active"
                                                : "contact"
                                        }
                                    >
                                        <div className="wrap">
                                            <span className="contact-status online"/>
                                            <img id={contact.id} src={contact.profilePicUrl} alt=""/>
                                            <div className="meta">
                                                <p className="name">{contact.username}</p>
                                                {contact.newMessages !== undefined &&
                                                contact.newMessages > 0 && (
                                                    <p className="preview">
                                                        {contact.newMessages} new messages
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div id="bottom-bar">
                            <button id="addcontact">
                                <i className="fa fa-user fa-fw" aria-hidden="true"/>{" "}
                                <span>Profile</span>
                            </button>
                            <button id="settings">
                                <i className="fa fa-cog fa-fw" aria-hidden="true"/>{" "}
                                <span>Settings</span>
                            </button>
                        </div>
                    </div>
                    <div className="content">
                        <div className="contact-profile">
                            <img src={activeContact && activeContact.profilePicUrl} alt=""/>
                            <p>{activeContact && activeContact.username}</p>
                        </div>
                        <ScrollToBottom className="messages">
                            <ul>
                                {messages.map((msg) => (
                                    <li
                                        className={msg.senderId === currentUser.id ? "sent" : "replies"}>
                                        {msg.senderId !== currentUser.id && (
                                            <img src={activeContact.profilePicUrl} alt=""/>
                                        )}
                                        <p>{msg.content}</p>
                                    </li>
                                ))}
                            </ul>
                        </ScrollToBottom>
                        <div className="message-input">
                            <div className="wrap">
                                <input
                                    name="user_input"
                                    size="large"
                                    placeholder="Write your message..."
                                    value={text}
                                    onChange={(event) => setText(event.target.value)}
                                    onKeyPress={(event) => {
                                        if (event.key === "Enter") {
                                            sendMessage(text);
                                            setText("");
                                        }
                                    }}
                                />

                                <Button
                                    icon={<i className="fa fa-paper-plane" aria-hidden="true"/>}
                                    onClick={() => {
                                        sendMessage(text);
                                        setText("");
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>


            </MDBRow>
        </MDBContainer>
    );
};

export default Chat;
