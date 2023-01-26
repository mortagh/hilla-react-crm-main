package com.example.application.data.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.application.data.entity.Channel;


public interface ChannelRepository extends JpaRepository<Channel, UUID> {

}
