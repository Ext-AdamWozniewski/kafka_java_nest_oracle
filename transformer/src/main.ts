import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module.js';
import {AsyncMicroserviceOptions, Transport} from "@nestjs/microservices";
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
    const app = await NestFactory.createMicroservice<AsyncMicroserviceOptions>(AppModule, {
        useFactory: (config: ConfigService) => ({
            transport: Transport.KAFKA,
            options: {
                client: {
                    clientId: 'transformer', brokers: config.getOrThrow<string>('KAFKA_BROKERS').split(','),
                },
                consumer: {
                    groupId: 'transformer',
                },
                subscribe: {
                    fromBeginning: true,
                }
            },
        }),
        inject: [ConfigService]

    });
    await app.listen();
}

await bootstrap();
