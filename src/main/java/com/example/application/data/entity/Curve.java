package com.example.application.data.entity;

import java.util.LinkedList;
import java.util.List;

import javax.annotation.Nullable;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

@Entity
public class Curve extends AbstractEntity {

    @NotBlank
    private String name;
    
    @OneToMany
    @Nullable
    private List<Chart> chart = new LinkedList<>();

    @NotEmpty
    private String color = "";

    @NotEmpty
    private String position = "";

    public AbstractEntity getChart() {
        return null;
    }

    public void setChart(Chart orElseThrow) {
    }




}
