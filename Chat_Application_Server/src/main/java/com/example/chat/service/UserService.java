package com.example.chat.service;

import com.example.chat.dto.request.LoginRequest;
import com.example.chat.dto.request.SignUpRequest;
import com.example.chat.dto.response.UserSummary;
import com.example.chat.model.User;
import com.example.chat.model.UserPrincipal;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {

    ResponseEntity<?> registerUser(SignUpRequest signUpRequest);

    ResponseEntity<?> authenticateUser(LoginRequest loginRequest);

    UserSummary findByUserId(String userId);

    List<UserSummary> findAllUserSummaries(UserPrincipal currentUser);
}
