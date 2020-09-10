package com.example.chat.model;

import lombok.Data;

import java.io.Serializable;
import java.time.ZonedDateTime;

@Data
public class DateModel implements Serializable {

    private ZonedDateTime createTime;

    private ZonedDateTime updateTime;

    private ZonedDateTime deleteTime;
}
