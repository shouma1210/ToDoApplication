import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Todo } from "./models/todo.model";
import { Category } from "./models/category.model";


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


  async createTodo(description: string,categoryId: number): Promise<void> {
    await this.todoModel.create({ description, categoryId });
  }

  async deleteTodo(id: number): Promise<void> {
    await this.todoModel.destroy({ where: { id } });
  }

  async updateTodo(id: number, description: string, categoryId: number): Promise<void> {
    await this.todoModel.update(
      { description, categoryId },
      { where: { id } }
    );
  }

  async readCategories() {
    return await this.categoryModel.findAll();  
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
