import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Board } from '@prisma/client'
import { CreateBoardDto } from "./dto/create-board.dto"

@Injectable()
export class BoardsService {
  constructor(private readonly prismaService: PrismaService) { };

  async getBoards(): Promise<Board[]> {
    return await this.prismaService.board.findMany();
  }

  async getBoard(id: number): Promise<Board> {
    const board = await this.prismaService.board.findUnique({
      where: { id },
    });

    if (!board) throw new NotFoundException(`Board #${id} not found`);

    return board;
  }

  async createBoard(board: CreateBoardDto): Promise<Board> {
    return await this.prismaService.board.create(
      {
        data: {
          title: board.title,
          desc: board.desc,
          long_desc: board.long_desc,
          owner_id: 1,
        }
      }
    )
  }
}
