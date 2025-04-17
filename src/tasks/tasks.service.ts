// src/tasks/tasks.service.ts
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { eq } from 'drizzle-orm';
import * as schema from '../database/schema';
import { UsersService } from '../users/users.service';
import { CreateTaskDto } from './dto/create-task.dto';
// src/tasks/tasks.service.ts
import {
  DrizzleAsyncProvider,
  DrizzleClient,
} from '../database/drizzle.provider';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './interfaces/task.interface';

@Injectable()
export class TasksService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly drizzle: DrizzleClient, // ✅ Properly typed
    private readonly usersService: UsersService,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    if (createTaskDto.assignedUserId) {
      const userExists = await this.usersService.exists(
        createTaskDto.assignedUserId,
      );
      if (!userExists) {
        throw new BadRequestException('User not found');
      }
    }

    const [task] = await this.drizzle
      .insert(schema.tasks)
      .values(createTaskDto)
      .returning();

    return task;
  }

  async findAll(assignedUserId?: string): Promise<Task[]> {
    const where = assignedUserId
      ? eq(schema.tasks.assignedUserId, assignedUserId)
      : undefined;

    return this.drizzle.select().from(schema.tasks).where(where);
  }

  async findOne(id: string): Promise<Task> {
    const [task] = await this.drizzle
      .select()
      .from(schema.tasks)
      .where(eq(schema.tasks.id, id));

    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    if (updateTaskDto.assignedUserId) {
      const userExists = await this.usersService.exists(
        updateTaskDto.assignedUserId,
      );
      if (!userExists) {
        throw new BadRequestException('User not found');
      }
    }

    const [task] = await this.drizzle
      .update(schema.tasks)
      .set({
        ...updateTaskDto,
        updatedAt: new Date(),
      })
      .where(eq(schema.tasks.id, id))
      .returning();

    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async remove(id: string): Promise<void> {
    await this.drizzle.delete(schema.tasks).where(eq(schema.tasks.id, id));
  }
}
