import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('seed')
export class SeedController {
    constructor(
        @Inject('SEED_SERVICE') private readonly client: ClientProxy,
    ) { }

    @Get()
    executeSeed() {
        return this.client.send('executeSeed', {});
    }
}
