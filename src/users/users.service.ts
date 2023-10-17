import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { logger } from 'src/utils/winstonLogger';

@Injectable()
export class UsersService {
  // inject User's Repository
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createAdmin(createUserDto: CreateUserDto): Promise<any> {
    const existingUser = await this.findOneByEmail(createUserDto.email);
    if (existingUser) {
      logger.error('User already exists with this email');
      return 'can not create this...';
    }

    const user: User = new User();
    user.fullname = createUserDto.fullname;
    user.age = createUserDto.age;
    user.email = createUserDto.email;
    user.password = await bcrypt.hash(createUserDto.password, 10);

    return await this.userRepository.save(user);
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    const existingUser = await this.findOneByEmail(createUserDto.email);
    if (existingUser) {
      logger.error('User already exists with this email');
      return 'can not create this...';
    }

    const user: User = new User();
    user.fullname = createUserDto.fullname;
    user.age = createUserDto.age;
    user.email = createUserDto.email;
    user.password = await bcrypt.hash(createUserDto.password, 10);

    return await this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId: id })
      .getOne();
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = new User();
    user.fullname = updateUserDto.fullname;
    user.age = updateUserDto.age;
    user.email = updateUserDto.email;
    user.password = await bcrypt.hash(updateUserDto.password, 10);
    user.id = id;

    return this.userRepository.save(user);
  }

  remove(id: number) {
    return this.userRepository.delete({ id });
  }
}
