package com.example.chat.service;

import com.example.chat.enums.MessageStatus;
import com.example.chat.exception.ResourceNotFoundException;
import com.example.chat.model.ChatMessage;
import com.example.chat.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ChatMessageServiceImpl implements ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomService chatRoomService;
    private final MongoOperations mongoOperations;

    @Autowired
    public ChatMessageServiceImpl(ChatMessageRepository chatMessageRepository, ChatRoomService chatRoomService,
                                  MongoOperations mongoOperations) {

        this.chatMessageRepository = chatMessageRepository;
        this.chatRoomService = chatRoomService;
        this.mongoOperations = mongoOperations;
    }

    @Override
    public ChatMessage save(ChatMessage chatMessage) {

        chatMessage.setStatus(MessageStatus.RECEIVED);

        return chatMessageRepository.save(chatMessage);
    }

    @Override
    public Long countNewMessages(String senderId, String recipientId) {

        return chatMessageRepository.countBySenderIdAndRecipientIdAndStatus(
                senderId, recipientId, MessageStatus.RECEIVED);
    }

    @Override
    public List<ChatMessage> findChatMessages(String senderId, String recipientId) {

        Optional<String> chatId = chatRoomService.getChatId(senderId, recipientId, false);

        List<ChatMessage> chatMessages = chatId.map(chatMessageRepository::findByChatId).orElse(new ArrayList<>());

        if (chatMessages.size() > 0) {
            updateStatuses(senderId, recipientId, MessageStatus.DELIVERED);
        }

        return chatMessages;
    }

    @Override
    public ChatMessage findById(String id) {

        return chatMessageRepository
                .findById(id)
                .map(chatMessage -> {
                    chatMessage.setStatus(MessageStatus.DELIVERED);
                    return chatMessageRepository.save(chatMessage);
                })
                .orElseThrow(() ->
                        new ResourceNotFoundException("can't find message (" + id + ")"));
    }

    @Override
    public void updateStatuses(String senderId, String recipientId, MessageStatus status) {
        Query query = new Query(
                Criteria
                        .where("senderId").is(senderId)
                        .and("recipientId").is(recipientId));
        Update update = Update.update("status", status);
        mongoOperations.updateMulti(query, update, ChatMessage.class);
    }
}
