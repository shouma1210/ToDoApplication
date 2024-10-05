import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement } from "sequelize-typescript";
import { Category } from "./category.model";

@Table({ tableName: "todo"})
export class Todo extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id?: number;

  @Column(DataType.STRING)
  description?: string;

  @ForeignKey(() => Category)
  @Column(DataType.INTEGER)
  categoryId?: number;

  @BelongsTo(() => Category)
  category?: Category;
}