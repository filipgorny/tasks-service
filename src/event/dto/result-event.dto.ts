import { ApiProperty } from '@nestjs/swagger';
import { Event } from '../entity/event.entity';

export class ResultEventDto {
  @ApiProperty()
  label: string;

  @ApiProperty()
  createdAt: Date;

  constructor(event?: Event) {
    if (event) {
      this.label = event.label;
      this.createdAt = event.createdAt;
    }
  }
}
