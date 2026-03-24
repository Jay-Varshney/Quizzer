package com.backend.quizzer.controller;

import org.springframework.web.bind.annotation.RestController;

import com.backend.quizzer.dto.Evaluate;
import com.backend.quizzer.dto.Evaluation;
import com.backend.quizzer.dto.Question;
import com.backend.quizzer.service.ChatService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("chat")
@CrossOrigin(origins = "*")
public class Controller {

    private final ChatService chatService;

    Controller(ChatService chatService) {
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

    @PostMapping("/evaluate")
    public Evaluation evaluateTheAnswers(@RequestBody Evaluate eval) {
        return chatService.evaluate(eval);
    }

}
