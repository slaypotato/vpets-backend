import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DB_URI'),
        auth: {
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASS')
        },
        dbName: configService.get('DB_NAME')
      }),
      inject:[ConfigService]
    }),
  ],
  exports:[DatabaseModule]
})
export class DatabaseModule {}
