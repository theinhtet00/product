import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateProductDto } from './dtos/create-product.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('get_all_product')
  async getAllProduct(): Promise<object> {
    return await this.appService.getAll();
  }

  @MessagePattern('create_product')
  async createProduct(body: CreateProductDto): Promise<object> {
    return await this.appService.store(body);
  }

  @MessagePattern('get_product_by_id')
  async getProductById(id: string): Promise<object> {
    return await this.appService.getOne(parseInt(id));
  }

  @MessagePattern('update_product')
  async updateProduct(body: {
    id: string;
    body: CreateProductDto;
  }): Promise<object> {
    return this.appService.update(parseInt(body.id), body.body);
  }

  @MessagePattern('delete_product')
  async deleteProduct(id: string): Promise<object> {
    return this.appService.delete(parseInt(id));
  }

  @EventPattern('order_created')
  async inventoryControl(body): Promise<object> {
    return this.appService.inventory(body);
  }
}
