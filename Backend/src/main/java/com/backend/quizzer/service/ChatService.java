package com.backend.quizzer.service;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;
import com.backend.quizzer.dto.Question;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;

@Service
public class ChatService {

    private ChatClient chatClient;
    
    ChatService(ChatClient.Builder builder){
        this.chatClient = builder.build();
    }

    public String chat(String querry){
        return chatClient.prompt()
                        .user(querry)
                        .call()
                        .content();
    }

    @Value("classpath:/prompts/user.st")
    private Resource usermsg;

    public Question genQue(int num, String q){

        return chatClient.prompt()
                        .user(u -> u.text(usermsg).param("number", num).param("topic", q))
                        .call()
                        .entity(Question.class);
    }

}
