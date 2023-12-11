import { Response } from 'express';

export class SuccessResponse {
  private message: string;
  private data: unknown;

  constructor(message: string, data: unknown) {
    this.message = message;
    this.data = data;
  }

  public static of(
    response: Response,
    message: string,
    data: unknown,
  ): Response {
    return response.status(200).json(new SuccessResponse(message, data));
  }
}
