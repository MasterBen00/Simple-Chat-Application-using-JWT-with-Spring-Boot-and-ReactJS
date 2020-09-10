package com.example.chat.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum LoginType {
	UNDEFINED(-1),
	DEFAULT(1),
	FACEBOOK(2),
	TWITTER(3),
	GOOGLE(4);

	private final int value;

	LoginType(int value) {
		this.value = value;
	}

	@JsonValue
	public int getValue() {
		return value;
	}

	public static LoginType forValue(int value) {
		return switch (value) {
			case 1 -> DEFAULT;
			case 2 -> FACEBOOK;
			case 3 -> TWITTER;
			case 4 -> GOOGLE;
			default -> UNDEFINED;
		};
	}

	@JsonCreator
	public static LoginType fromString(String str) {
		try {
			return forValue(Integer.parseInt(str));
		} catch (Exception e) {
			return UNDEFINED;
		}
	}
}