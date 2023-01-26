package com.example.application.data.endpoint;


import com.example.application.data.entity.Company;
import com.example.application.data.entity.Contact;
import com.example.application.data.entity.Status;
import com.example.application.data.repository.CompanyRepository;
import com.example.application.data.repository.ContactRepository;
import com.example.application.data.repository.StatusRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;

import java.util.List;
import java.util.UUID;

@Endpoint
@AnonymousAllowed
public class CrmEndpoint {
    private final ContactRepository contactRepository;
    private final CompanyRepository companyRepository;
    private final StatusRepository statusRepository;

    public CrmEndpoint(ContactRepository contactRepository, CompanyRepository companyRepository,
                       StatusRepository statusRepository) {
        this.contactRepository = contactRepository;
        this.companyRepository = companyRepository;
        this.statusRepository = statusRepository;
    }

    public List<Contact> getContacts() {
        return contactRepository.findAll();
    }

    public List<Company> getCompanies() {
        return companyRepository.findAll();
    }

    public List<Status> getStatuses() {
        return statusRepository.findAll();
    }

    public Contact saveContact(Contact contact) {
        contact.setCompany(companyRepository.findById(contact.getCompany().getId())
                .orElseThrow(() -> new RuntimeException(
                        "Could not find Company with id" + contact.getCompany().getId())));
        contact.setStatus(statusRepository.findById(contact.getStatus().getId())
                .orElseThrow(() -> new RuntimeException(
                        "Could not find Status with id" + contact.getStatus().getId())));
        return contactRepository.save(contact);
    }

    public void deleteContact(UUID contactId) {
        contactRepository.deleteById(contactId);
    }
}
