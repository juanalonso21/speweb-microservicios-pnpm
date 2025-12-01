import { Injectable } from '@nestjs/common';

@Injectable()
export class TestAppPnpmService {
  getHello(): string {
    return 'Hello World!';
  }
}
