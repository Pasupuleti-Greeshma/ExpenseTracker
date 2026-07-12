package com.fullstack.backend.moneymanager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.fullstack.backend.moneymanager.entity.Transaction;
import com.fullstack.backend.moneymanager.service.TransactionService;

@RestController
@RequestMapping("/transactions")
@CrossOrigin(origins = "*")
public class TransactionController {

    @Autowired
    private TransactionService service;

    @PostMapping
    public Transaction save(@RequestBody Transaction transaction) {

        return service.saveTransaction(transaction);

    }

    @GetMapping
    public List<Transaction> getTransactions() {

        return service.getAllTransactions();

    }

}