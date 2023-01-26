package com.example.application.data.endpoint;

import java.util.List;

import com.example.application.data.entity.Channel;
import com.example.application.data.repository.ChannelRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;

import dev.hilla.Endpoint;
import dev.hilla.Nonnull;

@Endpoint 
@AnonymousAllowed 
public class ChannelEndPoint {
    private ChannelRepository repository;

    public ChannelEndPoint(ChannelRepository repository) {
        this.repository = repository;
    }

    public @Nonnull List<Channel> findAll() {
        return repository.findAll();
    }
    
    public Channel save(Channel chart) {
        return repository.save(chart);
    }
}
