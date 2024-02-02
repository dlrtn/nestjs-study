import { SuccessResponse } from './success-response';
import { Response } from 'express';
import { SUCCESS_CODE } from '../response-code.constants';

export class OkResponse extends SuccessResponse {
  public static of(
    response: Response,
    message: string,
    data: unknown,
  ): Response {
    return response.status(SUCCESS_CODE.OK).json(new OkResponse(message, data));
  }
}
