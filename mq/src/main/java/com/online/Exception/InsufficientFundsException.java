package com.online.Exception;

import java.math.BigDecimal;

public class InsufficientFundsException extends RuntimeException {
    
    private final Long accountId;
    private final BigDecimal requestedAmount;
    private final BigDecimal availableBalance;
    
    public InsufficientFundsException(Long accountId, BigDecimal requestedAmount, BigDecimal availableBalance) {
        super("Insufficient funds in account ID: " + accountId + 
              ". Requested: " + requestedAmount + ", Available: " + availableBalance);
        this.accountId = accountId;
        this.requestedAmount = requestedAmount;
        this.availableBalance = availableBalance;
    }
    
    public Long getAccountId() {
        return accountId;
    }
    
    public BigDecimal getRequestedAmount() {
        return requestedAmount;
    }
    
    public BigDecimal getAvailableBalance() {
        return availableBalance;
    }
}