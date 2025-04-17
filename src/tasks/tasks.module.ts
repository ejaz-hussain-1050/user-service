// src/tasks/tasks.module.ts
import { Module } from '@nestjs/common';
import { DrizzleModule } from '../database/drizzle.module';
import { TasksController } from '../tasks/task.controller';
import { UsersModule } from '../users/users.module';
import { TasksService } from './tasks.service';

@Module({
  imports: [DrizzleModule, UsersModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
