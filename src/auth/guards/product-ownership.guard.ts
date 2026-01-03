import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { UserRole } from '../../users/enums/user-role.enum';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class ProductOwnershipGuard implements CanActivate {

    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user: User = request.user;
        const productId = parseInt(request.params.id, 10);

        console.log(request.user, productId);

        if (!user || isNaN(productId)) {
            throw new ForbiddenException('invalid user or productId');
        }

        if (user.role === UserRole.ADMIN) {
            return true;
        }

        const product = await this.productRepository.findOne({
            where: { id: productId },
            relations: ['createdBy'],
            select: {
                id: true,
                createdBy: {
                    id: true
                }
            }
        });

        if (!product) {
            throw new NotFoundException('product not found');
        }

        if (product.createdBy && product.createdBy.id === user.id) {
            return true;
        }

        throw new ForbiddenException('you are not the owner of this product');
    }
}