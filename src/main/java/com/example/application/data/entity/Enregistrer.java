package com.example.application.data.entity;

import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

@Entity
public class Enregistrer extends AbstractEntity {

    @NotNull
    private String name = "";

    @NotNull
    private String ip = "";

    @NotNull
    private String type = "";


    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getPosition() {
        return ip;
    }
    public void setPosition(String ip) {
        this.ip = ip;
    }


}
