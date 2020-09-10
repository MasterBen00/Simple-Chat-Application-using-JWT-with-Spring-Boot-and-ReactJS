package com.example.chat.repository;

import com.example.chat.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    Boolean existsByUserName(String userName);

    Boolean existsByEmail(String email);

    Optional<User> findByUserNameOrEmail(String userName, String email);
}
