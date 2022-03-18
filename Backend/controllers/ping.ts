import { Get, Post, Query, Route } from 'tsoa';

interface PingResponse {
    message: string;
}

@Route('ping')
export default class PingController {
    @Get('/')
    public async getMessage(): Promise<PingResponse> {
        return {
            message: 'pong'
        };
    }

    // check out tsoa docs for decorators
    // https://tsoa-community.github.io/docs/getting-started.html
    @Post('/')
    public async postMessage(@Query() message?: string): Promise<PingResponse> {
        return {
            message: 'pong'
        };
    }
}
