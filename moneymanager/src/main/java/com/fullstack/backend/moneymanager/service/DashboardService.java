package com.fullstack.backend.moneymanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fullstack.backend.moneymanager.entity.Dashboard;
import com.fullstack.backend.moneymanager.repository.DashboardRepository;

@Service
public class DashboardService {

    @Autowired
    private DashboardRepository repository;

    public Dashboard saveDashboard(Dashboard dashboard) {

        dashboard.setId(1L);

        return repository.save(dashboard);

    }

    public Dashboard getDashboard() {

        return repository.findById(1L)
                .orElse(new Dashboard(1L, 0, 0, 0));

    }

}