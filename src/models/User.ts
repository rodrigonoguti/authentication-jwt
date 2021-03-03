import { Column, CreateDateColumn, Entity, PrimaryColumn, BeforeInsert } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
class User {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    // If creating a new one
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };