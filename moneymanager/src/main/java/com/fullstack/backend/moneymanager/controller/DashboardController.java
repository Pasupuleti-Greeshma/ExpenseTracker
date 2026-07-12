package com.fullstack.backend.moneymanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.fullstack.backend.moneymanager.entity.Dashboard;
import com.fullstack.backend.moneymanager.service.DashboardService;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private DashboardService service;

    @PostMapping
    public Dashboard saveDashboard(@RequestBody Dashboard dashboard) {

        return service.saveDashboard(dashboard);

    }

    @GetMapping
    public Dashboard getDashboard() {

        return service.getDashboard();

    }

}