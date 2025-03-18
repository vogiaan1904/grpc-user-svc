import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from './base.entity';
import { HydratedDocument } from 'mongoose';

export type AddressDocument = HydratedDocument<Address>;

export class Address extends BaseEntity {
  @Prop({ required: false, minlength: 2, maxlength: 120 })
  street: string;

  @Prop({ required: true, minlength: 2, maxlength: 50 })
  city: string;

  @Prop({ required: false, minlength: 2, maxlength: 50 })
  state: string;

  @Prop({ required: false, minlength: 2, maxlength: 50 })
  postalCode: string;

  @Prop({ required: true, minlength: 2, maxlength: 50 })
  country: string;

  @Prop({ default: false })
  isDefault: boolean;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
