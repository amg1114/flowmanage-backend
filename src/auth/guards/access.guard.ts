import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

import { Project } from "src/projects/entities/project.entity";
import { ProjectsService } from "src/projects/projects.service";

import { Team } from "src/teams/entities/team.entity";

@Injectable()
export class AccessGuard implements CanActivate {
    constructor(
        private projectsService: ProjectsService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = context.switchToHttp().getRequest().user;

        const isAdmin = user.roles.includes('ADMIN');

        if (isAdmin) return true;

        const params = context.switchToHttp().getRequest().params;
        if (params.slug) {
            let isMember = false;

            if (request.url.includes('teams')) {
                isMember = user.teams.some((team: Team) => team.slug === params.slug);
            } else if (request.url.includes('projects')) {
                const project: Project = await this.projectsService.findProjectBySlug(params.slug);
                isMember = user.teams.some((team: Team) => team.id === project.team.id);
            }

            return isMember;
        }

        return false;
    }
}