import { Injectable, NestMiddleware, Logger, Inject } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    use(request: Request, response: Response, next: NextFunction): void {
        const { ip, method } = request;
        const url = request.originalUrl;
        const userAgent = request.get('user-agent') || '';

        response.on('close', () => {
            const { statusCode } = response;

            if (statusCode === 200 || statusCode === 201) {
                this.logger.log({
                    level: 'info',
                    message: '{method} {url} - {statusCode}',
                    method: method,
                    url: url,
                    statusCode: statusCode,
                    userAgent: userAgent,
                    ip: ip,
                });
            } else {
                this.logger.log({
                    level: 'error',
                    message: '{method} {url} - {statusCode}',
                    method: method,
                    url: url,
                    statusCode: statusCode,
                    userAgent: userAgent,
                    ip: ip,
                });
            }
        });

        next();
    }
}
