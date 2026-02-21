import dayjs from "dayjs";

export type ErrorServer = {
  message: string;
};

export class DateRange {
  public start: Date;
  public end: Date;

  constructor(
    value: number,
    unit?: dayjs.ManipulateType | undefined,
    end: Date = new Date(),
  ) {
    this.end = end;
    this.start = dayjs(this.end).subtract(value, unit).toDate();
  }
}
