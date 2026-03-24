package com.backend.quizzer.dto;
import java.util.List;

public class Evaluate {
    private Integer totalQuestionCount;
    private List<Attempt> attempts;

    public List<Attempt> getAttempts() {
        return attempts;
    }

    public void setAttempts(List<Attempt> attempts) {
        this.attempts = attempts;
    }

    public Integer getTotalQuestionCount() {
        return totalQuestionCount;
    }

    public void setTotalQuestionCount(Integer totalQuestionCount) {
        this.totalQuestionCount = totalQuestionCount;
    }

}
