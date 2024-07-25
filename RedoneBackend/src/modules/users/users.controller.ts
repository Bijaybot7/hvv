import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDetailsDto } from './dto/update-user-details.dto';
import { UpdateUserBandDto } from './dto/update-user-band.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get('search')
  @ApiQuery({ name: 'term', type: 'string' })
  @ApiQuery({ name: 'term', type: 'string', required: false })
  search(@Query('page') page: number, @Query('term') term: string) {
    return this.usersService.searchUsers(page, term);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Get()
  @ApiQuery({ name: 'sortColumn', type: 'string', required: false })
  @ApiQuery({ name: 'sortDirection', type: 'string', required: false })
  @ApiQuery({ name: 'name', type: 'string', required: false })
  @ApiQuery({ name: 'email', type: 'string', required: false })
  get(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sortColumn') sortColumn?: string,
    @Query('sortDirection') sortDirection?: string,
    @Query('name') name?: string,
    @Query('email') email?: string,
  ) {
    return this.usersService.getUsers(
      page,
      limit,
      sortColumn,
      sortDirection,
      name,
      email,
    );
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param('id') id: string, @Body() UpdateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, UpdateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }

  @Post('seedData')
  seedData(@Query('no') no: number) {
    return this.usersService.seedData(no);
  }

  @Put('/details/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateUserDetails(
    @Param('id') id: string,
    @Body() updateUserDetailsDto: UpdateUserDetailsDto,
  ) {
    return this.usersService.updateUserDetails(id, updateUserDetailsDto);
  }

  @Put('/band/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateUserBand(
    @Param('id') id: string,
    @Body() updateUserBandDto: UpdateUserBandDto,
  ) {
    return this.usersService.updateUserBand(id, updateUserBandDto);
  }
}
