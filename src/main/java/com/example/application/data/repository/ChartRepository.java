package com.example.application.data.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.application.data.entity.Chart;

public interface ChartRepository extends JpaRepository<Chart, UUID> {

}
