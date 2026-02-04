package com.online.Service;

import com.online.Entity.Account;
import com.online.Exception.AccountNotFoundException;
import com.online.Exception.InsufficientFundsException;
import com.online.Repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    public Account createAccount(Account account) {
        if (account.getBalance() == null) {
            account.setBalance(BigDecimal.ZERO);
        }
        return accountRepository.save(account);
    }
    
    public Optional<Account> getAccount(Long id) {
        return accountRepository.findById(id);
    }
    
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }
    
    public void deleteAccount(Long id) {
        accountRepository.deleteById(id);
    }
    
    public List<Account> searchAccountsByName(String name) {
        return accountRepository.findByAccountHolderNameContaining(name);
    }

    @Transactional
    public Account deposit(Long id, BigDecimal amount) {
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Deposit amount must be positive");
        }
        Account account = getAccount(id).orElseThrow(() -> new AccountNotFoundException(id));
        account.setBalance(account.getBalance().add(amount));
        return accountRepository.save(account);
    }

    @Transactional
    public Account withdraw(Long id, BigDecimal amount) {
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Withdrawal amount must be positive");
        }
        Account account = getAccount(id).orElseThrow(() -> new AccountNotFoundException(id));
        if (account.getBalance().compareTo(amount) < 0) {
            throw new InsufficientFundsException(id, amount, account.getBalance());
        }
        account.setBalance(account.getBalance().subtract(amount));
        return accountRepository.save(account);
    }
}