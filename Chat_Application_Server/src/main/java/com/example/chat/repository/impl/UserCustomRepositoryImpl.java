package com.example.chat.repository.impl;

import com.example.chat.model.User;
import com.example.chat.repository.UserCustomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class UserCustomRepositoryImpl implements UserCustomRepository {

    private final MongoTemplate mongoTemplate;

    @Autowired
    public UserCustomRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public Optional<User> findByUserNameOrEmail(String param1, String param2) {
        Query query = new Query();
        query.addCriteria(Criteria.where("userId").orOperator(Criteria.where("email").is(param1)));
        query.addCriteria(Criteria.where("userId").orOperator(Criteria.where("email").is(param2)));

        User user = mongoTemplate.findOne(query, User.class);

        return Optional.ofNullable(user);
    }
}
