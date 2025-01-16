import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ConflictException, UseGuards
} from "@nestjs/common";
import { UsersService } from './users.service';
import { CreateUserDto } from '../dto/user-dto/create-user.dto';
import { UpdateUserDto } from '../dto/user-dto/update-user.dto';
import { Public } from '../decorators/public.decorator';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PoliciesGuard } from "../guards/policies.guard";
import { CheckPolicies } from "../decorators/policy.decorator";
import { AppAbility } from "../casl/casl-ability.factory";
import { Action } from "../enums/action.enum";
import { AuthGuard } from "../auth/auth.guard";


@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Add a new user' })
  @ApiBody({ type: CreateUserDto })
  @Post()
  @Public()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      if (error.message === 'User with this email already exists') {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  @Get()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Article))
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return user;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.usersService.update(+id, updateUserDto);
      if (!updatedUser) {
        return { message: `User with ID ${id} not found` };
      }
      return updatedUser;
    } catch (error) {
      if (error.message === 'User with this email already exists') {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.usersService.remove(+id);
      return { message: 'User successfully deleted' };
    } catch {
      throw new NotFoundException('User not found');
    }
  }
}
