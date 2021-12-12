import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { Category } from './Category';
import { Specification } from './Specification';

@Entity('cars')
class Car {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  daily_date: number;

  @Column()
  available: boolean;

  @Column()
  license_plate: string;

  @Column()
  fine_amount: number;

  @Column()
  brand: string;

  // Muitas categorias relacionadas a um carro (many to one) <=> um carro pode ter uma ou várias categorias (one to many)
  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  category_id: string;

  // Um Carro pode ter uma ou várias especificações (one to many) <=> Uma especificação pode estar associada a um ou vários carros (one to many)
  // Logo, o relacionamento será Many to Many (muitos para muitos)
  @ManyToMany(() => Specification)
  @JoinTable({
    name: 'specifications_cars',
    joinColumns: [{ name: 'car_id' }], // Id que pertence à entidade Car (car_id)
    inverseJoinColumns: [{ name: 'specification_id' }], // Id que pertence à classe de relacionamento (specifications_cars)
  })
  specifications: Specification[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.available = true;
    }
  }
}

export { Car };
