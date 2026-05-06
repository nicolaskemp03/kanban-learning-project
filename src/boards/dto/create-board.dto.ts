import {IsOptional, IsInt, IsString, Length, IsDate } from 'class-validator'

export class CreateBoardDto {
  
  @IsString()
  @Length(1, 50)
  title: string;

  @IsString()
  @IsOptional()
  @Length(1, 100)
  desc: string;

  @IsString()
  @IsOptional()
  long_desc: string;

}

