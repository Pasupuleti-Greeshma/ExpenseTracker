package com.fullstack.backend.moneymanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.fullstack.backend.moneymanager.entity.Dashboard;

public interface DashboardRepository extends JpaRepository<Dashboard, Long> {

}