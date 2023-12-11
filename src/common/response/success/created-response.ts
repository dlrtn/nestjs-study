import { SUCCESS_CODE } from '../response-code.constants';
import { SuccessResponse } from './success-response';
import { Response } from 'express';

export class CreatedResponse extends SuccessResponse {
  public static of(response: Response, message: string, data: unknown) {
    return response
      .status(SUCCESS_CODE.CREATED)
      .json(new CreatedResponse(message, data));
  }
}
