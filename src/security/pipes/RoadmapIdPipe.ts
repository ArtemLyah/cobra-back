import { Injectable, PipeTransform } from '@nestjs/common';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';
import { RoadmapRepository } from 'src/databases/repositories/roadmap.repository';

@Injectable()
export class RoadmapIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (
    private roadmapRepository: RoadmapRepository,
  ) {}

  async transform (roadmapId: string) {
    const roadmap = await this.roadmapRepository.findById(roadmapId);
    if (!roadmap) {
      throw new InvalidEntityIdException('Roadmap');
    }
    return roadmapId;
  }
}