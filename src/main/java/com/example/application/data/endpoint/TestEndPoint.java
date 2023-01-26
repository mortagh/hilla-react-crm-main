package com.example.application.data.endpoint;


import com.example.application.data.entity.Curve;
import com.example.application.data.entity.Chart;
import com.example.application.data.repository.CurveRepository;
import com.example.application.data.repository.ChartRepository;
import com.example.application.data.repository.StatusRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;

import java.util.List;
import java.util.UUID;

@Endpoint
@AnonymousAllowed
public class TestEndPoint {
    private final ChartRepository chartRepository;
    private final CurveRepository curveRepository;

    public TestEndPoint(ChartRepository chartRepository, CurveRepository curveRepository) {
        this.chartRepository = chartRepository;
        this.curveRepository = curveRepository;
    }

    public List<Chart> getCharts() {
        return chartRepository.findAll();
    }

    public List<Curve> getCurves() {
        return curveRepository.findAll();
    }


    public Chart saveChart(Chart chart) {
        System.out.println("_-_-_-test"+chart.getPosition());
        chart.setCurve(curveRepository.findById(chart.getCurve().getId())
                .orElseThrow(() -> new RuntimeException(
                        "Could not find Curve with id" + chart.getCurve().getId())));


        return chart;
    }

    public void deleteChart(UUID chartId) {
        chartRepository.deleteById(chartId);
    }
}
