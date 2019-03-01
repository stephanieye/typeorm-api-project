import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn,
    ManyToOne
} from 'typeorm';
import User from './User'
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

    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}

export default Post;