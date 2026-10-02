package com.example.extractor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;
import tools.jackson.databind.json.JsonMapper;

import org.springframework.beans.factory.annotation.Value;

@Component
public class TicketPublisher {
    private final KafkaTemplate<String, String> kafkaTemplate;
    private final JsonMapper jsonMapper = JsonMapper.builder().build();
    private final String topic;

    public TicketPublisher(KafkaTemplate<String, String> kafka, @Value("${extractor.topic}") String topic) {
        this.kafkaTemplate = kafka;
        this.topic = topic;
    }

    public void publish(Ticket ticket) {
        String key = String.valueOf(ticket.id());
        String value = jsonMapper.writeValueAsString(ticket);
        this.kafkaTemplate.send(topic, key, value).join();
    }
}
