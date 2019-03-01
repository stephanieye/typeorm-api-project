import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn,
    ManyToOne
} from 'typeorm';
import User from './User'
import Post from './Post'
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    text: string;
    
    @ManyToOne(() => User, (user) => user.comments, {eager: true})
    user: User;

    @ManyToOne(() => Post, (post) => post.comments, {eager: true})
    post: Post;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}

export default Comment;