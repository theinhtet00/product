import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductEntity } from './product.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async getAll(): Promise<object> {
    return this.productRepository.find();
  }

  async getOne(id: number): Promise<object> {
    return await this.productRepository.findOne(id);
  }

  async store(body: CreateProductDto): Promise<object> {
    const product = await this.productRepository.findOne({ item: body.item });
    if (!product) {
      const new_product = this.productRepository.create(body);
      return await this.productRepository.save(new_product);
    }
  }

  async update(id: number, body: CreateProductDto): Promise<object> {
    const product = await this.productRepository.findOne(id);
    if (product) {
      product.item = body.item;
      product.stock = body.stock;
      return await this.productRepository.save(product);
    } else {
      throw new NotFoundException('product not found');
    }
  }

  async delete(id: number): Promise<object> {
    const product = await this.productRepository.findOne(id);
    return await this.productRepository.delete(product);
  }

  async inventory(body): Promise<object> {
    const product = await this.productRepository.findOne({ item: body.item });
    if (product) {
      product.stock = product.stock - body.quantity;
      return await this.productRepository.save(product);
    } else {
      throw new NotFoundException('product not found');
    }
  }
}
