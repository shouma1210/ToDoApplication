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
    

    @Delete(":id")
    async deleteTodo(
      @Param("id") id: string,
      @Res() res: any,) {
      await this.appService.deleteTodo(parseInt(id));
      return res.redirect("/todos");
    }

    @Put(":id")
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