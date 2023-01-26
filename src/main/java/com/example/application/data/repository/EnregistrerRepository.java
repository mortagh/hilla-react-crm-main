package com.example.application.data.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.application.data.entity.Enregistrer;


public interface EnregistrerRepository extends JpaRepository<Enregistrer, UUID> {

}
