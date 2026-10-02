import {Controller, Logger} from '@nestjs/common';
import {ElasticService} from "../elastic/elastic.service.js";
import {EventPattern, Payload} from "@nestjs/microservices";
import {toDocument} from "../utility/ticket.transform.js";
import type {Ticket} from "../utility/ticket.transform.js";
import {TICKETS_TOPIC} from "../utility/statics.js";

@Controller(TICKETS_TOPIC)
export class TicketsController {
    private readonly logger = new Logger(TicketsController.name);

    constructor(private readonly elasticService: ElasticService) {}

    @EventPattern(TICKETS_TOPIC)
    async handle(@Payload() ticket: Ticket) {
        const doc = toDocument(ticket);
        await this.elasticService.save(doc);
        this.logger.log(`Saved ${doc.key} [${doc.statusLabel}] ${doc.title}`);
    }

}
