import { Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Link {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string = '';

    @Column()
    public url: string = '';
}

export default Link;