import { Controller, Get, Param, Render, Post, Body,Delete, Put, Res } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller("todos")
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get("/")
  @Render("index.njk")
  async renderIndex() {
    const todos = await this.appService.readTodos(); 
    const categories = await this.appService.readCategories();
  return { posts: todos, categories }; 
  } 

  @Post()
  async createTodo(
    @Body("description") description: string,
    @Body("categoryId") categoryId: number,
    @Res() res: any,
    ){
      await this.appService.createTodo(description, categoryId);
      return res.redirect("/todos");
    }
    

    @Post(":id/delete")
    async deleteTodo(
      @Param("id") id: string,
      @Res() res: any,) {
      await this.appService.deleteTodo(parseInt(id));
      return res.redirect("/todos");
    }

    @Get(":id/put")
    @Render("update.njk")
    async renderUpdateTodoForm(@Param("id") id: string) {
      const todo = await this.appService.readTodoById(parseInt(id));
      const categories = await this.appService.readCategories(); 
      return { todo, categories };
    }

    @Post(":id/put")
    async updateTodo(
      @Param("id") id: string,
      @Body("description") description:string,
      @Body("categoryId") categoryId: number,
      @Res() res: any,
    ) {
      await this.appService.updateTodo(parseInt(id),description,categoryId);
      return res.redirect("/todos");
    }
    
    @Get("categories")
    @Render("category-form.njk")
    async renderCategoryForm() {
      return {};
    }
  
    @Post("categories")
    async createCategory(
      @Body("name") name: string,
      @Res() res: any,){
        await this.appService.createCategory(name);
        return res.redirect("/todos/categories");
      }
  
}