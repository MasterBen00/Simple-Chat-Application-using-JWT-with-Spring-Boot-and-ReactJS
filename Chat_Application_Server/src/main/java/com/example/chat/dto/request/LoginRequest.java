package com.example.chat.dto.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Data
public class LoginRequest implements Serializable {

    @NotBlank
    private String userNameOrEmail;

    @NotBlank
    private String password;
}