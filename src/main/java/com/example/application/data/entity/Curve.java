package com.example.application.data.entity;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

@Entity
public class Curve extends AbstractEntity {

    @NotBlank
    private String name;
     
    @ManyToOne
    private Chart chart;

    @NotEmpty
    private String color = "";

    @NotEmpty
    private String position = "";

    public Chart getChart() {
        return chart;
    }

    public void setChart(Chart chart) {
    	this.chart = chart;
    }




}
