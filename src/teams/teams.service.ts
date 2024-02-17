import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import slugify from 'slugify';

import { Team } from './entities/team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { AddMemberDto } from './dto/add-member.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    private readonly usersService: UsersService
  ) { }

  async create(createTeamDto: CreateTeamDto) {
    const slug = slugify(createTeamDto.name, { lower: true });
    const team = await this.teamRepository.findOne({ where: { slug } });
    if (team) {
      throw new HttpException('Team already exists', HttpStatus.CONFLICT);
    }
    return this.teamRepository.save({ ...createTeamDto, slug });
  }

  findAll() {
    return this.teamRepository.find({relations: ['members']});
  }

  async findOne(slug: string): Promise<Team> {
    const team = await this.teamRepository.findOne({ where: { slug } });
    if (!team) {
      throw new HttpException('Team not found', HttpStatus.NOT_FOUND);
    }
    return team;
  }

  async update(slug: string, updateTeamDto: UpdateTeamDto): Promise<UpdateResult> {
    const team = await this.teamRepository.update(slug, updateTeamDto);
    if (team.affected === 0) {
      throw new HttpException('Team not found', HttpStatus.NOT_FOUND);
    }
    return team;
  }

  async remove(slug: string): Promise<DeleteResult> {
    const team = await this.teamRepository.delete(slug);
    if (team.affected === 0) {
      throw new HttpException('Team not found', HttpStatus.NOT_FOUND);

    }
    return team;
  }

  // Members related methods
  async addMember({ teamId, userId }: AddMemberDto) {
    const team = await this.teamRepository.findOne({ where: { id: teamId }, relations: ['members']});
    const user = await this.usersService.findOne(userId);
    
    if (!team) {
      throw new HttpException('Team not found', HttpStatus.NOT_FOUND);
    }else if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    
    }
    const member = team.members.find((member) => member.id === userId);
    if (member) {
      throw new HttpException('User already a member of the team', HttpStatus.CONFLICT);
    }

    team.members.push(user);
    return this.teamRepository.save(team);
  }
}
