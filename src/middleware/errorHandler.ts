import { NextFunction, Request, Response } from 'express';

const errorMiddleware = (
    error: any,
    _: Request,
    response: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
): void => {
    console.log('caught error')
    let codeStatus = 500;
    let message = 'Something went wrong';
    let stackTrace = 'No stacktrace';

    if(typeof error.message === 'string'){
      message = error.message
    }

    if(typeof error.stack === 'string'){
      stackTrace = error.stack
    }

    console.log({
      message,
      stackTrace
    })


    response.status(codeStatus).send({
        codeStatus,
        status: 'error',
        message,
    });
};

export default errorMiddleware;
