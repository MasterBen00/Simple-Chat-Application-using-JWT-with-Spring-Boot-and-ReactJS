package com.example.chat.controller;

import com.example.chat.config.CurrentUser;
import com.example.chat.dto.response.UserSummary;
import com.example.chat.exception.AppException;
import com.example.chat.model.User;
import com.example.chat.model.UserPrincipal;
import com.example.chat.repository.UserRepository;
import com.example.chat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class UserController {

    private final UserRepository userRepository;
    private final UserService userService;

    @Autowired
    public UserController(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @GetMapping("/a/user/me")
    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {

        return userService.findByUserId(currentUser.getUserId());
    }

    @GetMapping("/p/user/{userId}")
    public User getUserById(@PathVariable String userId) {

        return userRepository.findById(userId)
                .orElseThrow(() -> new AppException("custom exception"));

    }

    @GetMapping("/a/users/summaries")
    public ResponseEntity<?> findAllUserSummaries(@CurrentUser UserPrincipal currentUser) {

        return ResponseEntity.ok(userService.findAllUserSummaries(currentUser));
    }

    @GetMapping("/lol/lol/{userId}")
    public User lol(@PathVariable String userId) {

        return userRepository.findById(userId)
                .orElseThrow(() -> new AppException("custom exception"));

    }
}
