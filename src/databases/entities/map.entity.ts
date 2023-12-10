import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SchemaTypes } from 'mongoose';

@Schema()
export class MapsEntity {
  @Prop({ type: SchemaTypes.UUID, required: true })
    roadmap_id: string;
  
  @Prop({ required: true })
    structure: Object;
}

export type MapsDocument = HydratedDocument<MapsEntity>;
export const MapsSchema = SchemaFactory.createForClass(MapsEntity);