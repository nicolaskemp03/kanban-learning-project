import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto'
import { BoardsService } from './boards.service'
import { Board } from '@prisma/client';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) { }

  @Get()
  async getBoards(): Promise<Board[]> {
    return await this.boardsService.getBoards();
  }

  @Get(':id')
  async getBoard(@Param('id') id: number): Promise<Board> {
    console.log(id)
    return await this.boardsService.getBoard(id)
  }

  @Post()
  async createBoard(@Body() createBoardDto: CreateBoardDto) {
    return await this.boardsService.createBoard(createBoardDto);
  }




}
