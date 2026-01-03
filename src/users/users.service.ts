import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import bcrypt from 'node_modules/bcryptjs';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  @Transactional()
  async create(input: CreateUserDto) {

    const userExists = await this.userRepository.findOne({
      where: { email: input.email },
    });

    if (userExists) {
      throw new BadRequestException('email already in use');
    }

    let hashedPassword: string;
    if (input.password !== input.passwordConfirmation) {
      throw new BadRequestException('passwords do not match');
    } else {
      hashedPassword = await bcrypt.hash(input.password, 10);
    }

    const user = await this.userRepository.save({
      name: input.name,
      email: input.email,
      password: hashedPassword,
      role: input.role,
    });
    user.password = undefined!;
    return user;
  }

  async findAll(): Promise<User[]> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    queryBuilder.orderBy({
      'user.id': 'ASC',
    });
    const users = await queryBuilder.getMany();
    return users;
  }

  async findOne(id: number,): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      return undefined;
    }
    return user;
  }

  @Transactional()
  async update(id: number, input: UpdateUserDto): Promise<User> {
    let user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`user not found`);
    }

    if (input.name) {
      user.name = input.name;
    }

    if(input.role) {
      user.role = input.role;
    }

    if (input.email) {
      const userExists = await this.userRepository.findOne({
        where: { email: input.email },
      });
      if (userExists && userExists.id !== id) {
        throw new BadRequestException('user already exists');
      }
      user.email = input.email;
    }

    if (input.password) {
      let hashedPassword: string;
      if (input.password !== input.passwordConfirmation) {
        throw new BadRequestException('passwords do not match');
      } else {
        hashedPassword = await bcrypt.hash(input.password, 10);
      }
      user.password = hashedPassword;
    }

    user = await this.userRepository.save({
      ...user,
    });
    return user;
  }

  @Transactional()
  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }

    await this.userRepository.softRemove(user);
  }

  async findByEmailWithPassword(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      select: [
        'id',
        'name',
        'email',
        'role',
        'password',
        'createdAt',
        'updatedAt',
      ],
    });
  }
}
