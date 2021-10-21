import { bcryptPasswordTransform } from '../helpers/bcrypt.helper'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity
} from 'typeorm'

@Entity()
export default class Users extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ transformer: bcryptPasswordTransform })
  password: string;

  @Column({ default: true, nullable: true })
  status: boolean;

  @Column({ nullable: true })
  photo: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}
