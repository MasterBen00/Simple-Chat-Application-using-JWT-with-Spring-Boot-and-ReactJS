package com.example.chat.dto.response;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@Builder
public class UserSummary implements Serializable {
    private String id;
    private String username;
    private String email;
    private String profilePicUrl;
}
