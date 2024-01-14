import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongoSchema, HydratedDocument } from 'mongoose';

@Schema()
export class MapsModel {
  @Prop({ type: MongoSchema.Types.UUID, required: true })
    roadmap_id: string;
  
  @Prop({ required: true })
    structure: MongoSchema.Types.Mixed;
}

export type MapsDocument = HydratedDocument<MapsModel>;
export const MapsSchema = SchemaFactory.createForClass(MapsModel);