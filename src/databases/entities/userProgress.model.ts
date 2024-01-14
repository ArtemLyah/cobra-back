import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongoSchema } from 'mongoose';
import { MapsModel } from './map.model';

@Schema()
export class UserProgressModel {
  @Prop({ required: true })
    user_id: string;

  @Prop({ type: MongoSchema.Types.ObjectId, ref: 'maps', required: true })
    map_id: MapsModel;
  
  @Prop({ required: true })
    structure: MongoSchema.Types.Mixed;
}

export type UserProgressDocument = HydratedDocument<UserProgressModel>;
export const UserProgressSchema = SchemaFactory.createForClass(UserProgressModel);