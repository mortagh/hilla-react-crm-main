package com.example.application.data.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.application.data.entity.Curve;

public interface CurveRepository extends JpaRepository<Curve, UUID> {

}