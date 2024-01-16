import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { MapsDocument, MapsModel } from '../entities/map.model';

@Injectable()
export class MapRepository {
  constructor (
    @InjectModel(MapsModel.name)
      private mapModel: Model<MapsModel>,
  ) {}

  async create (data: MapsModel): Promise<MapsDocument> {
    const map = await this.mapModel.create(data);
    return map.save();
  }

  find (filter?: FilterQuery<MapsModel>): Promise<MapsDocument[]> {
    return this.mapModel.find(filter);
  }
  
  findOne (filter: FilterQuery<MapsModel>): Promise<MapsDocument> {
    return this.mapModel.findOne(filter);
  }
  
  findById (roadmap_id: string): Promise<MapsDocument> {
    return this.mapModel.findOne({
      roadmap_id,
    });
  }

  delete (roadmap_id: string) {
    return this.mapModel.deleteOne({
      roadmap_id,
    }).exec();
  } 
}