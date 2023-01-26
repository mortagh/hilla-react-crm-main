package com.example.application.data.entity;

import java.util.LinkedList;
import java.util.List;

import javax.annotation.Nullable;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

@Entity
public class Channel extends AbstractEntity {

    @NotBlank
    private String name;
    
    @OneToMany
    @Nullable
    private List<Enregistrer> chart = new LinkedList<>();

    @NotEmpty
    private String way = "";

    @NotEmpty
    private String unit = "";




}
