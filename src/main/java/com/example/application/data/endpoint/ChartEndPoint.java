package com.example.application.data.endpoint;

import java.util.List;

import com.example.application.data.entity.Chart;
import com.example.application.data.repository.ChartRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;

import dev.hilla.Endpoint;
import dev.hilla.Nonnull;

@Endpoint 
@AnonymousAllowed 
public class ChartEndPoint {
    private ChartRepository repository;

    public ChartEndPoint(ChartRepository repository) {
        this.repository = repository;
    }

    public @Nonnull List<@Nonnull Chart> findAll() {
        return repository.findAll();
    }
    
    public Chart save(Chart chart) {
        return repository.save(chart);
    }
}
