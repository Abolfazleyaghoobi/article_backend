
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { User } from "../../users/entities/user.entity";

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

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
