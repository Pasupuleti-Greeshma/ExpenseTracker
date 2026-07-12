package com.fullstack.backend.moneymanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fullstack.backend.moneymanager.entity.Transaction;
import com.fullstack.backend.moneymanager.repository.TransactionRepository;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository repository;

    public Transaction saveTransaction(Transaction transaction) {

        return repository.save(transaction);

    }

    public List<Transaction> getAllTransactions() {

        return repository.findAll();

    }

}