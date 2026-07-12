package com.fullstack.backend.moneymanager.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Dashboard {

    @Id
    private Long id;

    private int income;
    private int expense;
    private int cashInHand;

    public Dashboard() {
    }

    public Dashboard(Long id, int income, int expense, int cashInHand) {
        this.id = id;
        this.income = income;
        this.expense = expense;
        this.cashInHand = cashInHand;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getIncome() {
        return income;
    }

    public void setIncome(int income) {
        this.income = income;
    }

    public int getExpense() {
        return expense;
    }

    public void setExpense(int expense) {
        this.expense = expense;
    }

    public int getCashInHand() {
        return cashInHand;
    }

    public void setCashInHand(int cashInHand) {
        this.cashInHand = cashInHand;
    }
}