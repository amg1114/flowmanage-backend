import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Project } from "src/projects/entities/project.entity";
import { ProjectsService } from "src/projects/projects.service";
import { Team } from "src/teams/entities/team.entity";

@Injectable()
export class ProjectsGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private reflector: Reflector,
        private projectsService: ProjectsService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const user = context.switchToHttp().getRequest().user;

        const isAdmin = user.roles.includes('ADMIN');

        if (isAdmin) {
            console.log("Passing through as admin");
            
            return true;
        }
        
        const params = context.switchToHttp().getRequest().params;
        if (params.slug) {
            const project: Project = await this.projectsService.findProjectBySlug(params.slug);
            
            if (project && user) {
                const isMember = user.teams.some((team: Team) => team.id === project.team.id);
                if (isMember) {
                    console.log("Passing through as member");
                    return true;
                    
                }
            }
        }

        return false;
    }
}