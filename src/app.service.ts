import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { List, User } from '@prisma/client';
import { Interface } from 'readline';
import { promises } from 'dns';


@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {};
  async getHello(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }
}