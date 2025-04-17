/* eslint-disable @typescript-eslint/no-unsafe-call */
// src/tasks/dto/update-task.dto.ts
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUUID()
  @IsOptional()
  assignedUserId?: string;

  @IsString()
  @IsOptional()
  status?: string;
}
