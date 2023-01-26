package com.example.application.data.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

@Entity
public class Chart extends AbstractEntity {

    @NotNull
    private String name = "";

    @NotNull
    private int position = 1;

    @ManyToOne
    @JoinColumn(name = "curve_id")
    @NotNull
    private Curve curve;

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public int getPosition() {
        return position;
    }
    public void setPosition(int position) {
        this.position = position;
    }

    public Curve getCurve() {
        return curve;
    }
    public void setCurve(Curve curve) {
        this.curve = curve;
    }
    public AbstractEntity getChannel() {
        return null;
    }
    public void setChannel(Channel orElseThrow) {
    }

}
