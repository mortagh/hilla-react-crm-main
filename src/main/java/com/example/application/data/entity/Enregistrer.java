package com.example.application.data.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
public class Enregistrer extends AbstractEntity {

    @NotEmpty
    private String name = "";

    @NotEmpty
    private String ip = "";

    @NotEmpty
    private String type = "";

    @ManyToOne
    @JoinColumn(name = "channel_id")
    @NotNull
    private Channel channel;

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

    public Channel getChannel() {
        return channel;
    }
    public void setChannel(Channel channel) {
        this.channel = channel;
    }

}
