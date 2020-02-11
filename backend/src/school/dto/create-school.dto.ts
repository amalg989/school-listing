export class CreateSchoolDto {
  readonly name: string;
  readonly address: {
    street: String,
    suburb: String,
    postcode: String,
    state: String
  };
  readonly numberOfStudents: number;
}