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

  async createTeam(createTeamDto: CreateTeamDto) {
    const slug = slugify(createTeamDto.name, { lower: true });
    const team = await this.teamRepository.findOne({ where: { slug } });
    if (team) {
      throw new HttpException('Team already exists', HttpStatus.CONFLICT);
    }
    return this.teamRepository.save({ ...createTeamDto, slug });
  }

  findAllTeams() {
    return this.teamRepository.find({ relations: ['members'] });
  }

  async findOneTeam(slug: string): Promise<Team> {
    const team = await this.teamRepository.findOne({ where: { slug } });
    if (!team) {
      throw new HttpException('Team not found', HttpStatus.NOT_FOUND);
    }
    return team;
  }

  async updateTeam(slug: string, updateTeamDto: UpdateTeamDto): Promise<UpdateResult> {
    const team = await this.teamRepository.findOne({ where: { slug } });
    if (!team) {
      throw new HttpException('Team not found', HttpStatus.NOT_FOUND);
    }
    return this.teamRepository.update(team.id, updateTeamDto);
  }

  async deleteTeam(slug: string): Promise<DeleteResult> {
    const team = await this.teamRepository.findOne({ where: { slug } });
    if (!team) {
      throw new HttpException('Team not found', HttpStatus.NOT_FOUND);
    }

    return this.teamRepository.delete(team.id);
  }

  // Members related methods
  async addTeamMember({ teamId, userId }: AddMemberDto) {
    // To Do
  }
}
