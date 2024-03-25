import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SALT_ROUNDS } from 'src/config/constants/bycript.constants';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    create(createUserDto: CreateUserDto) {
        const encrypted_password = bcrypt.hashSync(
            createUserDto.password,
            SALT_ROUNDS,
        );
        createUserDto.password = encrypted_password;
        return this.userRepository.save(createUserDto);
    }

    findAll() {
        return this.userRepository.find();
    }

    async findOne(id: number) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: {
                workflowsToManagers: {
                    workflow: true,
                },
                teamsToUsers: { team: true },
            },
        });
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    async findByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.update(id, updateUserDto);
        if (user.affected === 0) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    async remove(id: number) {
        const user = await this.userRepository.delete(id);
        if (user.affected === 0) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return user;
    }
}
