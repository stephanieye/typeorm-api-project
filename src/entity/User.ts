import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn
    } from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";
  
@Entity()
@Unique(["username"])

export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    @Length(4, 20)
    @IsNotEmpty()
    username: string;
  
    @Column()
    @Length(4, 100)
    @IsNotEmpty()
    password: string;
  
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
  
    hashPassword() {
      this.password = bcrypt.hashSync(this.password, 8);
    }
  
    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
      return bcrypt.compareSync(unencryptedPassword, this.password);
    }
  }

  export default User