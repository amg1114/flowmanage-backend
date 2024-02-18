import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export class TeamAccessGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    const { teamId } = context.switchToHttp().getRequest().params;
    const { teams } = user;
    const team = teams.find((team) => team.id === teamId);
    return !!team;
  }
}