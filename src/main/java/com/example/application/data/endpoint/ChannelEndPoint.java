package com.example.application.data.endpoint;


import com.example.application.data.entity.Enregistrer;
import com.example.application.data.entity.Channel;
import com.example.application.data.repository.EnregistrerRepository;
import com.example.application.data.repository.ChannelRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;

import java.util.List;
import java.util.UUID;

@Endpoint
@AnonymousAllowed
public class ChannelEndPoint {
    private final ChannelRepository channelRepository;
    private final EnregistrerRepository enregistrerRepository;

    public ChannelEndPoint(ChannelRepository channelRepository, EnregistrerRepository enregistrerRepository) {
        this.channelRepository = channelRepository;
        this.enregistrerRepository = enregistrerRepository;
    }

    public List<Channel> getChannels() {
        return channelRepository.findAll();
    }

    public List<Enregistrer> getEnregistrers() {
        return enregistrerRepository.findAll();
    }


    public Channel saveChannel(Channel channel) {
    	System.out.println(channel.getId());
    	System.out.println(channel.getEnregistrer());
    	System.out.println(channel.getEnregistrer().getId());
        channel.setEnregistrer(enregistrerRepository.findById(channel.getEnregistrer().getId())
                .orElseThrow(() -> new RuntimeException(
                        "Could not find Enregistrer with id" + channel.getEnregistrer().getId())));


        return channelRepository.save(channel);
    }

    public void deleteChannel(UUID channelId) {
        channelRepository.deleteById(channelId);
    }
}
