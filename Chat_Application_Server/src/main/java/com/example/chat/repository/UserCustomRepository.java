package com.example.chat.repository;

import com.example.chat.model.User;

import java.util.Optional;

public interface UserCustomRepository {

    Optional<User> findByUserNameOrEmail(String param1, String param2);
}
