package com.example.chat.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import org.apache.commons.lang3.StringUtils;

public enum Gender {
    MALE(1, "male"),
    FEMALE(2, "female"),
    CUSTOM(3, "custom"),
    UNDEFINED(-1, StringUtils.EMPTY);

    private final int value;
    private final String name;

    Gender(int value, String name) {
        this.value = value;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    @JsonValue
    public int getValue() {
        return value;
    }

    public static Gender forValue(Integer value) {
        return switch (value) {
            case 1 -> MALE;
            case 2 -> FEMALE;
            case 3 -> CUSTOM;
            default -> UNDEFINED;
        };
    }

    @JsonCreator
    public static Gender forValue(String value) {
        try {
            return forValue(Integer.parseInt(value));
        } catch (Exception e) {
            return UNDEFINED;
        }
    }

    public static Gender fromName(String name) {
        if (name.equalsIgnoreCase(MALE.getName())) {
            return MALE;
        } else if (name.equalsIgnoreCase(FEMALE.getName())) {
            return FEMALE;
        } else if (name.equalsIgnoreCase(CUSTOM.getName())) {
            return CUSTOM;
        } else {
            return UNDEFINED;
        }
    }
}