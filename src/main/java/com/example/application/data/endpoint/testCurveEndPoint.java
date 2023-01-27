package com.example.application.data.endpoint;


import com.example.application.data.entity.Chart;
import com.example.application.data.entity.Curve;
import com.example.application.data.repository.ChartRepository;
import com.example.application.data.repository.CurveRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;

import java.util.List;
import java.util.UUID;

@Endpoint
@AnonymousAllowed
public class testCurveEndPoint {
    private final CurveRepository curveRepository;
    private final ChartRepository chartRepository;

    public testCurveEndPoint(CurveRepository curveRepository, ChartRepository chartRepository) {
        this.curveRepository = curveRepository;
        this.chartRepository = chartRepository;
    }

    public List<Curve> getCurves() {
        return curveRepository.findAll();
    }

    public List<Chart> getCharts() {
        return chartRepository.findAll();
    }


    public Curve saveCurve(Curve curve) {
        curve.setChart(chartRepository.findById(curve.getChart().getId())
                .orElseThrow(() -> new RuntimeException(
                        "Could not find Chart with id" + curve.getChart().getId())));


        return curveRepository.save(curve);
    }

    public void deleteCurve(UUID curveId) {
        curveRepository.deleteById(curveId);
    }
}
