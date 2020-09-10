package com.example.chat.model;

import com.example.chat.enums.LoginType;
import lombok.Data;

import java.io.Serializable;

@Data
public class Credentials implements Serializable {

    private LoginType loginType;

    private String password;

    private String fbAccessToken;

    private String twitterAccessToken;

    private String twitterSecretToken;

    private String accessToken;

    private String refreshToken;
}
