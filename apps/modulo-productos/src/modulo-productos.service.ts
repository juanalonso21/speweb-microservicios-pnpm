import { Injectable } from '@nestjs/common';

@Injectable()
export class ModuloProductosService {
  getHello(): string {
    return 'Hello World!';
  }
}
