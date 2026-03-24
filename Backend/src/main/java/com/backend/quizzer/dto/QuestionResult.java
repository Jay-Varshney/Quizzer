package com.backend.quizzer.dto;

public class QuestionResult {
    private Integer score;
    private String detailedFeedback;

    public String getDetailedFeedback() {
        return detailedFeedback;
    }

    public void setDetailedFeedback(String detailedFeedback) {
        this.detailedFeedback = detailedFeedback;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }
}
