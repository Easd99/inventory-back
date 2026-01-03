import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Index, OneToMany, ManyToOne } from "typeorm";
import { Category } from "../../categories/entities/category.entity";

@Entity('products')
@Index(['name'], { unique: true, where: '"deletedAt" IS NULL' })
export class Product {
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
        { type: 'decimal', precision: 10, scale: 2 }
    )
    price: number;

    @Column(
        { type: 'int', default: 0 }
    )
    stock: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;

    //relations
    @ManyToOne(() => Category, x => x.products, { nullable: false, eager: true })
    category?: Category;

}
