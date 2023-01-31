package com.example.application.data.entity;


import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

@Entity
public class Channel extends AbstractEntity {

    @NotBlank
    private String name;
    
    @ManyToOne
    private Enregistrer enregistrer;

    @NotEmpty
    private String way = "";

    @NotEmpty
    private String unit = "";
    
    public Enregistrer getEnregistrer(){
        return enregistrer;
    }
    public void setEnregistrer(Enregistrer enregistrer){
        this.enregistrer = enregistrer;
    }




}
