import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity
} from 'typeorm'
import Users from './Users'

@Entity()
export default class Events extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  startTime: Date;

  @Column()
  finishTime: Date;

  @Column({ default: false, nullable: true })
  status: boolean;

  @Column({ default: false, nullable: true })
  statusDeleted: boolean

  @ManyToOne((type) => Users, (user) => user.id, {
    onDelete: 'CASCADE',
    eager: true
  })
  @JoinColumn({ name: 'createdBy', referencedColumnName: 'id' })
  createdBy: Users;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}
