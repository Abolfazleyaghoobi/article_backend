import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Tag } from "../../tags/entities/tag.entity";
@Entity("articles")
export class Article {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 200 })
  title!: string;

  @Column({ type: "varchar", length: 250, unique: true })
  slug!: string;

  @Column({ type: "text" })
  content!: string;

  @Column({ type: "varchar", length: 30, default: "draft" })
  status!: "draft" | "published";

  @ManyToOne(() => User, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "userId" })
  author!: User;

  @Column({ type: "int" })
  userId!: number;

  @ManyToMany(() => Tag, (tag) => tag.articles)
  @JoinTable({ name: "article_tags" })
  tags!: Tag[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
