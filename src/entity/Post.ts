import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn,
    ManyToOne,
    OneToMany
} from 'typeorm';
import User from './User'
import Comment from './Comment'
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
    
    @ManyToOne(() => User, (user) => user.posts, {eager: true})
    user: User;

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[];

    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}

export default Post;