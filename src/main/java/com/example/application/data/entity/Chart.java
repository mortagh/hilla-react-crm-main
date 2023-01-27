package com.example.application.data.entity;

import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

@Entity
public class Chart extends AbstractEntity {

    @NotNull
    private String name = "";

    @NotNull
    private int position = 1;

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
    
    

}
