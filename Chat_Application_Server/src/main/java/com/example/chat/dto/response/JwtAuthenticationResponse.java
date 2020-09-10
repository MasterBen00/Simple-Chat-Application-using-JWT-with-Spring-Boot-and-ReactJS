package com.example.chat.dto.response;

import lombok.Data;

import java.io.Serializable;

@Data
public class JwtAuthenticationResponse implements Serializable {
    private String accessToken;
    private String tokenType = "Bearer";

    public JwtAuthenticationResponse(String accessToken) {
        this.accessToken = accessToken;
    }

}