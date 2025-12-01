import { Test, TestingModule } from '@nestjs/testing';
import { ModuloProductosController } from './modulo-productos.controller';
import { ModuloProductosService } from './modulo-productos.service';

describe('ModuloProductosController', () => {
  let moduloProductosController: ModuloProductosController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ModuloProductosController],
      providers: [ModuloProductosService],
    }).compile();

    moduloProductosController = app.get<ModuloProductosController>(ModuloProductosController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(moduloProductosController.getHello()).toBe('Hello World!');
    });
  });
});
