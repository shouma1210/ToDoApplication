import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Todo } from "./models/todo.model";
import { Category } from "./models/category.model";
import { Op } from "sequelize";

@Injectable()
export class AppService {
 constructor(
  @InjectModel(Todo)
  private todoModel: typeof Todo,

  @InjectModel(Category)
  private categoryModel: typeof Category,
 ){}

  async readTodos(): Promise<Todo[]> {
    return this.todoModel.findAll({ include: [Category] });
  }

  async readTodoByDate(date: number): Promise<Todo[]> {
    const todos = await this.todoModel.findAll({
      where: {
       date: date, 
      },
      include: [Category], 
    });
    return todos; 
  }

  async readTodo(id: number): Promise<Todo> {
    const todo = await this.todoModel.findByPk(id, { include: [Category] });
    if (!todo) {
      throw new Error("Todo not found"); 
    }
    return todo; 
  }

  async createTodo(description: string, date: number, categoryId: number): Promise<void> {
    await this.todoModel.create({ description, date, categoryId });
  }

  async deleteTodo(id: number): Promise<void> {
    await this.todoModel.destroy({ where: { id } });
  }

  async updateTodo(id: number, description: string, date: number, categoryId: number): Promise<void> {
    await this.todoModel.update(
      { description, date, categoryId },
      { where: { id } }
    );
  }

  async readCategory(id: number): Promise<Category | null> {
    const category = await this.categoryModel.findByPk(id);
    if (!category) {
      throw new Error("Category not found"); 
    }
    return category; 
  }

  async createCategory(name: string): Promise<void> {
    await this.categoryModel.create({ name });
  }

  async deleteCategory(id: number): Promise<void> {
    await this.todoModel.destroy({ where: { id } });
  }

  async updateCategory(id: number, name: string): Promise<void> {
    await this.categoryModel.update(
      { name },
      { where: { id } }
    );
  }
}
