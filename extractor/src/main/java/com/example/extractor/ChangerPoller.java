package com.example.extractor;

import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.Instant;
import java.util.List;

import org.slf4j.Logger;
import org.springframework.stereotype.Component;

@Component
public class ChangerPoller {
    private static final Logger logger = LoggerFactory.getLogger(ChangerPoller.class);
    private final TicketRepo ticketRepo;
    private final TicketPublisher ticketPublisher;
    private Instant instant = Instant.EPOCH;

    public ChangerPoller(TicketRepo ticketRepo, TicketPublisher ticketPublisher) {
        this.ticketRepo = ticketRepo;
        this.ticketPublisher = ticketPublisher;
    }

    @Scheduled(fixedDelay = 2000)
    public void poll() {
        List<Ticket> changed = this.ticketRepo.findChangedSince(instant);
        if (changed.isEmpty()) {
            return;
        }

        for (Ticket ticket : changed) {
            ticketPublisher.publish(ticket);
            logger.info("SEND: #{} [{}] {}", ticket.id(), ticket.status(), ticket.title());
        }
        instant = changed.get(changed.size() - 1).updatedAt();
    }
}
