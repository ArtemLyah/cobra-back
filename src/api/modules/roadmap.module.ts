import { Module } from '@nestjs/common';
import { RoadmapController } from '../controllers/roadmap.controller';
import { RoadmapMapper } from '../mappers/roadmap.mapper';
import { RoadmapService } from '../services/roadmap.service';

@Module({
  controllers: [RoadmapController],
  providers: [RoadmapService, RoadmapMapper],
  exports: [RoadmapService],
})
export class RoadmapModule {}