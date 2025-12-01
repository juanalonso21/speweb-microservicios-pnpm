import { Injectable } from '@nestjs/common';

@Injectable()
export class ModuloUsuariosService {
  getHello(): string {
    return 'Hello World!';
  }
}
