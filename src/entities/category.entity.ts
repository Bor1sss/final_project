import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('categories')
export class Category{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  parentCategoryId: number | null;

  @ManyToOne(() => Category, (category) => category.subcategories, {
    nullable: true,
  })
  parentCategory: Category | null;

  @OneToMany(() => Category, (category) => category.parentCategory)
  subcategories: Category[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
