import { Controller, Get, Param, Put, Delete, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // GET /users/:id

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }


  // PUT /users/:id
  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.usersService.update(+id, body);
  }

  // DELETE /users/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
