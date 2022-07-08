import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty()
  label: string;

  @ApiProperty()
  done: boolean;
}
