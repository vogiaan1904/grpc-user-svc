import { status as GrpcStatus } from '@grpc/grpc-js';
import {
  BadRequestException,
  INestMicroservice,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { throwError } from 'rxjs';
import { AppModule } from './app.module';
import { USER_PACKAGE_NAME } from './protos/user.pb';
import { GlobalExceptionFilter } from './common/filters/grpc-exception.filter';
import { RpcInvalidArgumentException } from './common/exceptions/rpc.exception';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const PORT = process.env.PORT || 50052;
  const app: INestMicroservice = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `0.0.0.0:${PORT}`,
        package: USER_PACKAGE_NAME,
        protoPath: join('node_modules/grpc-nest-proto/proto/user.proto'),
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        throw new RpcInvalidArgumentException('Validation failed');
      },
    }),
  );
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen();
}
bootstrap();
