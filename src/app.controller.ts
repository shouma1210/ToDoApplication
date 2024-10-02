import { Controller, Get, Param, Query, Post, Body,Delete, Put  } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller("todos")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getTodos() {
    const todos = await this.appService.readTodos();
    return todos;
  }

  @Get("date/:date")
  async getTodoByDate(@Param("date") date: string) {
    const todobydate = await this.appService.readTodoByDate(parseInt(date));
    return todobydate;
  }

  @Get(":id")
  async getTodoById(@Param("id") id: string) {
    const todo = await this.appService.readTodo(parseInt(id));
    return todo;
  }

  @Post()
  async createTodo(
    @Body("description") description: string,
    @Body("date") date:number,
    @Body("categoryId") categoryId: number,
    ){
      await this.appService.createTodo(description, date, categoryId);
      return { message: "Todo created successfully"};
    }
    

    @Delete(":id")
    async deleteTodo(@Param("id") id: string) {
      await this.appService.deleteTodo(parseInt(id));
      return { message: "Todo deleted successfully" };
    }

    @Put(":id")
    async updateTodo(
      @Param("id") id: string,
      @Body("description") description:string,
      @Body("date") date: number,
      @Body("categoryId") categoryId: number,
    ) {
      await this.appService.updateTodo(parseInt(id),description,date,categoryId);
      return { message: "Todo updated successfully" };
    }
    
    @Get("categories/:id")
    async getCategorybyId(@Param("id") id: string) {
      const category = await this.appService.readCategory(parseInt(id));
      return category;
    }
  
    @Post("categories")
    async createCategory(@Body("name") name: string){
        await this.appService.createCategory(name);
        return { message: "Category created successfully"};
      }
  
    @Delete("categories/:id")
    async deleteCategory(@Param("id") id: string) {
      await this.appService.deleteCategory(parseInt(id));
      return { message: "Category deleted successfully" };
    }
  
    @Put("categories/:id")
    async updateCategory(
      @Param("id") id: string,
      @Body("description") name:string,
    ) {
      await this.appService.updateCategory(parseInt(id),name);
      return { message: "Todo updated successfully" };
    }

}
