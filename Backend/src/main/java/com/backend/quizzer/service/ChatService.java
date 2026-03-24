package com.backend.quizzer.service;
import org.springframework.ai.chat.client.ChatClient;

import org.springframework.stereotype.Service;
import com.backend.quizzer.dto.Evaluate;
import com.backend.quizzer.dto.Evaluation;
import com.backend.quizzer.dto.Question;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;

@Service
public class ChatService {

    private ChatClient chatClient;

    ChatService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    public String chat(String querry) {
        return chatClient.prompt()
                .user(querry)
                .call()
                .content();
    }

    @Value("classpath:/prompts/user.st")
    private Resource usermsg;

    public Question genQue(int num, String q) {

        return chatClient.prompt()
                .user(u -> u.text(usermsg).param("number", num).param("topic", q))
                .call()
                .entity(Question.class);
    }

    @Value("classpath:/prompts/evaluation.st")
    private Resource evaluation;

    // public Evaluation evaluate(Evaluate eval) {
    //     System.err.println(eval);
    //     return chatClient.prompt()
    //             .user(u -> u.text(evaluation)
    //                         .param("quizData", eval)
    //                         .param("totalCount", eval.getTotalQuestionCount()))
    //             .call()
    //             .entity(Evaluation.class);
    // }
    public Evaluation evaluate(Evaluate eval) {
        // NOTE we HAVE to use the object mapper else it will call to string function while passing and cause err as it will just return the objects address and not its actual value that is stored inside it 
        try {
            String quizJson = new ObjectMapper().writeValueAsString(eval);
            System.out.println(quizJson);
            return chatClient.prompt()
                    .user(u -> u.text(evaluation)
                        .param("quizData", quizJson)
                        .param("totalCount", eval.getTotalQuestionCount()))
                    .call()
                    .entity(Evaluation.class);
        } catch (Exception e) {
            throw new RuntimeException("Serialization failed", e);
        }
    }

}
