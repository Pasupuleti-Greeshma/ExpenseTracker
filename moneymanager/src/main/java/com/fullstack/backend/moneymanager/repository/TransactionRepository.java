package com.fullstack.backend.moneymanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.fullstack.backend.moneymanager.entity.Transaction;

public interface TransactionRepository
        extends JpaRepository<Transaction, Integer> {

}
