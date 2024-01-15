import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';

@Schema({ timestamps: true, id: true, collection: 'maps' })
export class MapsModel {
  @Prop({ required: true })
    roadmap_id: string;
  
  @Prop({ 
    type: String, 
    required: true,
  })
    structure: string;

  @Prop({ default: now() })
    createdAt?: Date;

  @Prop({ default: now() })
    updatedAt?: Date;
}

export type MapsDocument = HydratedDocument<MapsModel>;
export const MapsSchema = SchemaFactory.createForClass(MapsModel);