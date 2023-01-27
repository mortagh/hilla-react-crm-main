package com.example.application.data.endpoint;


import com.example.application.data.entity.Chart;
import com.example.application.data.repository.ChartRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;

import java.util.List;
import java.util.UUID;

@Endpoint
@AnonymousAllowed
public class TestEndPoint {
    private final ChartRepository chartRepository;

    public TestEndPoint(ChartRepository chartRepository) {
        this.chartRepository = chartRepository;
    }

    public List<Chart> getCharts() {
        return chartRepository.findAll();
    }


    public Chart saveChart(Chart chart) {
    	System.out.println(chart.getId());
    	System.out.println(chart.getPosition());

        return chartRepository.save(chart);
    }

    public void deleteChart(UUID chartId) {
        chartRepository.deleteById(chartId);
    }
}
