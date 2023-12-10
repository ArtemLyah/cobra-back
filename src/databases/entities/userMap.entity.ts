import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SchemaTypes } from 'mongoose';
import { MapsEntity } from './map.entity';

@Schema()
export class UserMapProgresEntity {
  @Prop({ required: true })
    user_id: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'maps', required: true })
    map_id: MapsEntity;
  
  @Prop({ required: true })
    structure: Object;
}

export type UserMapProgresDocument = HydratedDocument<UserMapProgresEntity>;
export const UserMapProgresSchema = SchemaFactory.createForClass(UserMapProgresEntity);