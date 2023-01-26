package com.example.application.data.endpoint;

import java.util.List;

import com.example.application.data.entity.Curve;
import com.example.application.data.repository.CurveRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;

import dev.hilla.Endpoint;
import dev.hilla.Nonnull;

@Endpoint 
@AnonymousAllowed 
public class CurveEndPoint {
    private CurveRepository repository;

    public CurveEndPoint(CurveRepository repository) {
        this.repository = repository;
    }

    public @Nonnull List<@Nonnull Curve> findAll() {
        return repository.findAll();
    }
    
    public Curve save(Curve curve) {
        return repository.save(curve);
    }
}
