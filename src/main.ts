import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  HttpStatus,
  INestMicroservice,
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import { RpcException, Transport } from '@nestjs/microservices';
import { protobufPackage } from './modules/user/user.pb';
import { join } from 'path';
import { AllExceptionsFilter } from './common/filters/grpc-exception.filter';
import { status as GrpcStatus } from '@grpc/grpc-js';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app: INestMicroservice = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:50052',
        package: protobufPackage,
        protoPath: join('node_modules/grpc-nest-proto/proto/user.proto'),
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        logger.error('Validation failed:', errors);
        return new RpcException({
          code: GrpcStatus.INVALID_ARGUMENT,
          message: 'Validation failed',
          details: errors,
        });
      },
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen();
}
bootstrap();
