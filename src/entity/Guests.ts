import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Events from "./Events";
import Users from "./Users";

@Entity()
export default class Guests extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false, nullable: true })
  status: boolean;

  @ManyToOne(() => Events, (event) => event.id, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "eventId", referencedColumnName: "id" })
  eventId: Events;

  @ManyToOne(() => Users, (user) => user.id, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  userId: Users;

  @ManyToOne(() => Users, (user) => user.id, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "hostId", referencedColumnName: "id" })
  hostId: Users;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt: Date;
}
