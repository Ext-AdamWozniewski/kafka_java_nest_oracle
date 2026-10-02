import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {Client} from "@elastic/elasticsearch";
import {TicketDocument} from "../utility/ticket.transform.js";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class ElasticService implements OnModuleInit {
    private readonly logger = new Logger(ElasticService.name);
    private readonly client: Client;
    private readonly index: string;

    constructor(config: ConfigService) {
        this.client = new Client({node: config.getOrThrow<string>('ELASTIC_URL')});
        this.index = config.getOrThrow<string>('ELASTIC_INDEX')
    }

    async onModuleInit() {
        const exist = await this.client.indices.exists({index: this.index});

        if (exist) return;

        await this.client.indices.create({
            index: this.index,
            mappings: {
                properties: {
                    id: {type: 'long'},
                    key: {type: 'keyword'},
                    title: {type: 'text'},
                    description: {type: 'text'},
                    status: {type: 'keyword'},
                    statusLabel: {type: 'keyword'},
                    isOpen: {type: 'boolean'},
                    updateAt: {type: 'date'},
                    indexedAt: {type: 'date'},
                }
            }
        });
        this.logger.log(`Create INDEX: ${this.index})`);
    }

    async save(document: TicketDocument) {
        await this.client.index({
            index: this.index,
            id: String(document.id),
            document
        });
    }
}
