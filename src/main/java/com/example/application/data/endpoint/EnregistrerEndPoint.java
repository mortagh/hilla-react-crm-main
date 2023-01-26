package com.example.application.data.endpoint;

import java.util.List;

import com.example.application.data.entity.Enregistrer;
import com.example.application.data.repository.EnregistrerRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;

import dev.hilla.Endpoint;
import dev.hilla.Nonnull;

@Endpoint 
@AnonymousAllowed 
public class EnregistrerEndPoint {
    private EnregistrerRepository repository;

    public EnregistrerEndPoint(EnregistrerRepository repository) {
        this.repository = repository;
    }

    public @Nonnull List<Enregistrer> findAll() {
        return repository.findAll();
    }
    
    public Enregistrer save(Enregistrer chart) {
        return repository.save(chart);
    }
}
