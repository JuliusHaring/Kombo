import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DancingModule } from './dancing/dancing.module';
import { StatusController } from './status.controller';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './supabase/supabase.module';
import { HTTPLoggingMiddleware } from './middlewares/http-logging.middleware';
import { JsonBodyMiddleware } from './middlewares/json-body.middleware';
import { RawBodyMiddleware } from './middlewares/raw-body.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    DancingModule,
    SupabaseModule,
  ],
  controllers: [StatusController],
  providers: [],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RawBodyMiddleware)
      .forRoutes({
        path: 'stripe/webhook',
        method: RequestMethod.POST,
      })
      .apply(JsonBodyMiddleware)
      .forRoutes('*')
      .apply(HTTPLoggingMiddleware)
      .forRoutes('*');
  }
}
