import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column, Entity, Index, OneToMany } from "typeorm";
import { Product } from "../../products/entities/product.entity";

@Entity('categories')
@Index(['name'], { unique: true, where: '"deletedAt" IS NULL' })
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100,
    })
    name: string;

    @Column(
        { length: 255 }
    )
    description: string;

    @Column(
        { default: true, type: 'boolean' }
    )
    active: boolean;

    productsCount?: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;

    //relations
    @OneToMany(() => Product, product => product.category)
    products?: Product[];

}
