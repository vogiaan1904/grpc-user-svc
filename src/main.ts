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
import { AllExceptionsFilter } from './common/filters/grpc-exception.filter';
import { USER_PACKAGE_NAME } from './protos/user.pb';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app: INestMicroservice = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:50052',
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
        throw new BadRequestException({
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
