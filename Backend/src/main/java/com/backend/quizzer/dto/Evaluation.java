package com.backend.quizzer.dto;

import java.util.List;

public class Evaluation {
    private int totalScore;
    private List<QuestionResult> results;
    public int getTotalScore() {
        return totalScore;
    }
    public void setTotalScore(int totalScore) {
        this.totalScore = totalScore;
    }
    public List<QuestionResult> getResults() {
        return results;
    }
    public void setResults(List<QuestionResult> results) {
        this.results = results;
    }
}
