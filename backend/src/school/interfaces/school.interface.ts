import { Document } from 'mongoose';

export interface School extends Document {
  readonly name: string;
  readonly address: {
    street: String,
    suburb: String,
    postcode: String,
    state: String
  };
  readonly numberOfStudents: number;
}