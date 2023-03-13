import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    /**
     * @description Exception json response
     * @param message
     */
    const responseMessage = (type, message) => {
        // console.log(response);
        
      response.status(status).json({
        statusCode: status,
        errorType: type,
        errorMessage: message,
      });
    };

    // Throw an exceptions for either
    // MongoError, ValidationError, TypeError, CastError and Error
   
    
    if (exception.message && exception.message['error']) {
      responseMessage('Error', exception?.message['error']);
    } else {
      responseMessage(exception.name, exception.message);
    }
  }
}
