export class EmailDto {
    readonly subject: string;
    readonly destinations: string[];
    readonly text: string;
  }