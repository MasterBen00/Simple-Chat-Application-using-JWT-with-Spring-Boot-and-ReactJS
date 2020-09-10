package com.example.chat.service;

import com.example.chat.enums.MessageStatus;
import com.example.chat.model.ChatMessage;

import java.util.List;

public interface ChatMessageService {

    ChatMessage save(ChatMessage chatMessage);

    Long countNewMessages(String senderId, String recipientId);

    List<ChatMessage> findChatMessages(String senderId, String recipientId);

    ChatMessage findById(String id);

    void updateStatuses(String senderId, String recipientId, MessageStatus status);
}
