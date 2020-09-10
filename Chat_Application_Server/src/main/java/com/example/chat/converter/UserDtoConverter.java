package com.example.chat.converter;

import com.example.chat.dto.response.UserSummary;
import com.example.chat.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserDtoConverter {

    public UserSummary convertToUserSummary(User user) {

        return UserSummary.builder()
                .id(user.getUserId())
                .username(user.getUserName())
                .email(user.getEmail())
                .profilePicUrl(user.getProfilePicUrl())
                .build();
    }
}
