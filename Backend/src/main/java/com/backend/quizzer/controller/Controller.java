package com.backend.quizzer.controller;
import org.springframework.web.bind.annotation.RestController;

import com.backend.quizzer.dto.Question;
import com.backend.quizzer.service.ChatService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("chat")
// @CrossOrigin(origins = "http://localhost:5173")
@CrossOrigin(origins = "*")
public class Controller {

    private final ChatService chatService;

    Controller(ChatService chatService){
        this.chatService = chatService;
    }

    @GetMapping("/normal")
    public String callnormalai(@RequestParam("q") String q) {
        return chatService.chat(q);
    }

    @GetMapping("/genQue")
    public Question generaQuestion(@RequestParam("n") int num, @RequestParam("q") String q) {
        return chatService.genQue(num, q);
    }
    
    

}
