package com.example.chat.service;

import com.example.chat.config.JwtTokenProvider;
import com.example.chat.converter.UserDtoConverter;
import com.example.chat.dto.request.LoginRequest;
import com.example.chat.dto.request.SignUpRequest;
import com.example.chat.dto.response.ApiResponse;
import com.example.chat.dto.response.JwtAuthenticationResponse;
import com.example.chat.dto.response.UserSummary;
import com.example.chat.enums.Role;
import com.example.chat.model.Credentials;
import com.example.chat.model.User;
import com.example.chat.model.UserPrincipal;
import com.example.chat.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final UserDtoConverter userDtoConverter;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, AuthenticationManager authenticationManager,
                           JwtTokenProvider tokenProvider, PasswordEncoder passwordEncoder,
                           UserDtoConverter userDtoConverter) {

        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.passwordEncoder = passwordEncoder;
        this.userDtoConverter = userDtoConverter;
    }

    @Override
    public ResponseEntity<?> registerUser(SignUpRequest signUpRequest) {

        if (userRepository.existsByUserName(signUpRequest.getUsername())) {

            return new ResponseEntity<>(new ApiResponse(false, "Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {

            return new ResponseEntity<>(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }

        User user = new User();

        user.setUserName(signUpRequest.getUsername());
        user.setFirstName(signUpRequest.getFirstName());
        user.setLastName(signUpRequest.getLastName());
        user.setEmail(signUpRequest.getEmail());
        user.setProfilePicUrl(signUpRequest.getProfilePicUrl());

        Set<Role> roles = Set.of(Role.END_USER);
        user.setRoles(roles);


        Credentials credentials = new Credentials();

        credentials.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));

        user.setCredentials(credentials);

        User result = userRepository.save(user);

        return new ResponseEntity<>(new ApiResponse(true, "User registered successfully"), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<?> authenticateUser(LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUserNameOrEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @Override
    public UserSummary findByUserId(String userId) {

        Optional<User> optionalUser = userRepository.findById(userId);

        return optionalUser.map(userDtoConverter::convertToUserSummary).orElse(null);
    }

    @Override
    public List<UserSummary> findAllUserSummaries(UserPrincipal currentUser) {

        return userRepository.findAll()
                .stream()
                .filter(user -> !user.getUserName().equals(currentUser.getUsername()))
                .map(userDtoConverter::convertToUserSummary)
                .collect(Collectors.toList());
    }
}
