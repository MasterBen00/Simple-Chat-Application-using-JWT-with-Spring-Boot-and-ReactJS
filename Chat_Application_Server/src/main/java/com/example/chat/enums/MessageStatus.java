package com.example.chat.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum MessageStatus {
    UNDEFINED(-1),
    SENT(1),
    RECEIVED(2),
    DELIVERED(3);

    private final int value;

    MessageStatus(int value) {
        this.value = value;
    }

    @JsonValue
    public int getValue() {
        return value;
    }

    public static MessageStatus forValue(int value) {
        return switch (value) {
            case 1 -> SENT;
            case 2 -> RECEIVED;
            case 3 -> DELIVERED;
            default -> UNDEFINED;
        };
    }

    @JsonCreator
    public static MessageStatus fromString(String str) {
        try {
            return forValue(Integer.parseInt(str));
        } catch (Exception e) {
            return UNDEFINED;
        }
    }
}