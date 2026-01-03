import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column, Entity, Index } from "typeorm";


@Entity('categories')
@Index(['name'], { unique: true, where: '"deletedAt" IS NULL' })
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100,
        unique: true,
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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;

}
