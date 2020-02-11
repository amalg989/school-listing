import * as mongoose from 'mongoose';

export const SchoolSchema = new mongoose.Schema({
  name: String,
  numberOfStudents: Number,
  address: {
    street: String,
    suburb: String,
    postcode: String,
    state: String
  },
});