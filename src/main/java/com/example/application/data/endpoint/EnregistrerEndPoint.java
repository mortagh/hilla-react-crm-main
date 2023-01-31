package com.example.application.data.endpoint;


import com.example.application.data.entity.Enregistrer;
import com.example.application.data.repository.EnregistrerRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;

import java.util.List;
import java.util.UUID;

@Endpoint
@AnonymousAllowed
public class EnregistrerEndPoint {
    private final EnregistrerRepository enregistrerRepository;

    public EnregistrerEndPoint(EnregistrerRepository enregistrerRepository) {
        this.enregistrerRepository = enregistrerRepository;
    }

    public List<Enregistrer> getEnregistrers() {
        return enregistrerRepository.findAll();
    }


    public Enregistrer saveEnregistrer(Enregistrer enregistrer) {
    	System.out.println(enregistrer.getId());
    	System.out.println(enregistrer.getPosition());

        return enregistrerRepository.save(enregistrer);
    }

    public void deleteEnregistrer(UUID enregistrerId) {
        enregistrerRepository.deleteById(enregistrerId);
    }
}
