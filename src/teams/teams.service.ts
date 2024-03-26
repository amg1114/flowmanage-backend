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
        private readonly usersService: UsersService,
    ) {}

    public async getUserTeams(user: number) {
        const teams = await this.teamRepository.find({
            where: {
                teamsToUsers: { user: { id: user } },
            },
        });

        if (!teams.length) {
            throw new HttpException('No teams found for the given user', HttpStatus.NOT_FOUND);
        }

        return teams;
    }

    public async createWorkflowTeam(workflow: number, teamFields: CreateTeamDto) {
        const slug = slugify(teamFields.name, { lower: true });
        const alreadyExists = await this.teamRepository.exists({
            where: { workflow: { id: workflow }, slug },
        });

        if (alreadyExists) {
            throw new HttpException('Teams already exists', HttpStatus.CONFLICT);
        }

        return this.teamRepository.save({ ...teamFields, slug, workflow: { id: workflow } });
    }

    /**
     * Updates a team
     * @param id The team ID
     * @param teamFields The updated team fields
     * @returns Update Result
     */
    public async updateTeam(id: number, teamFields: UpdateTeamDto) {
        const updateResult = await this.teamRepository.update(id, teamFields);
        if (updateResult.affected === 0) {
            throw new HttpException('The team could not be updated', HttpStatus.CONFLICT);
        }

        return updateResult;
    }

    /**
     * Deletes a team
     * @param id The team ID
     * @returns Delete Result
     */
    public async deleteTeam(id: number) {
        const deleteResult = await this.teamRepository.delete(id);
        if (deleteResult.affected === 0) {
            throw new HttpException('The project could not be deleted', HttpStatus.CONFLICT);
        }

        return deleteResult;
    }
}
