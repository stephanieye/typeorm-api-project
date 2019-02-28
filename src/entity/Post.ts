import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    title: string;

    @Column()
    url: string;

    @Column()
    text: string;

    @Column()
    @IsNotEmpty()
    authorId: number; 

    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}

export default Post;