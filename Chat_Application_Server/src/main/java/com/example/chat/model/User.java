package com.example.chat.model;

import com.example.chat.constants.Constants;
import com.example.chat.enums.Gender;
import com.example.chat.enums.Role;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.ZonedDateTime;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = Constants.UserDocument.USERS)
public class User extends DateModel {
    @Id
    private String userId;

    private Credentials credentials;

    private String userName;

    private String firstName;

    private String lastName;

    private ZonedDateTime dateOfBirth;

    private String email;

    private Gender gender;

    private String country;

    private Boolean active;

    private Set<Role> roles;

    private String profilePicUrl;
}
