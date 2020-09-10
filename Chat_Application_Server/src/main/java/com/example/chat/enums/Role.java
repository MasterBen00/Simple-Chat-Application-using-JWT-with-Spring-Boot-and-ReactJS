package com.example.chat.enums;

import com.example.chat.constants.Constants;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Role {
    UNDEFINED(-1),
    ADMIN(1),
    END_USER(2);

    private final int value;

    Role(int value) {
        this.value = value;
    }

    @JsonValue
    public int getValue() {
        return value;
    }

    public String getAuthorityName() {

        return Constants.ApiEndpoint.ROLE_AUTHORITY_PREFIX + name();
    }

    public static Role forValue(int value) {
        return switch (value) {
            case 1 -> ADMIN;
            case 2 -> END_USER;
            default -> UNDEFINED;
        };
    }

    @JsonCreator
    public static Role fromString(String str) {
        try {
            return forValue(Integer.parseInt(str));
        } catch (Exception e) {
            return UNDEFINED;
        }
    }

    public String getValueAsString() {
        return Integer.toString(this.value);
    }
}
