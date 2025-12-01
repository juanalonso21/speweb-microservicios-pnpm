import { Test, TestingModule } from '@nestjs/testing';
import { ModuloUsuariosController } from './modulo-usuarios.controller';
import { ModuloUsuariosService } from './modulo-usuarios.service';

describe('ModuloUsuariosController', () => {
  let moduloUsuariosController: ModuloUsuariosController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ModuloUsuariosController],
      providers: [ModuloUsuariosService],
    }).compile();

    moduloUsuariosController = app.get<ModuloUsuariosController>(ModuloUsuariosController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(moduloUsuariosController.getHello()).toBe('Hello World!');
    });
  });
});
