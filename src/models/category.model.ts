import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasMany} from "sequelize-typescript";
import { Todo } from './todo.model';

@Table({ tableName: "categories" })
export class Category extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id?: number;

  @Column(DataType.STRING)
  name?: string;

  @HasMany(() => Todo)
  todos?: Todo[];
}