/* eslint-disable @typescript-eslint/no-unsafe-call */
// src/tasks/dto/create-task.dto.ts
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUUID()
  @IsOptional()
  assignedUserId?: string;
}
