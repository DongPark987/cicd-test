import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { RedisIoAdapter } from './redis-io-adapter/redis-io-adapter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.use(cookieParser());

    //레디스 어뎁터
    const redisIoAdapter = new RedisIoAdapter(app);
    await redisIoAdapter.connectToRedis();
    app.useWebSocketAdapter(redisIoAdapter);

    if (!process.env.LISTEN_PORT) {
        throw new Error('LISTEN_PORT is not defined');
    }
    await app.listen(+process.env.LISTEN_PORT);
}
bootstrap();
