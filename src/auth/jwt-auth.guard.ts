import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(
        private jwtService: JwtService
    ){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const authHeader = req.headers.authorization;
            const berear = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if (berear !== "Bearer" || !token){
                throw new UnauthorizedException('The user is not registred yet');
            }

            const user = this.jwtService.verify(token);
            req.user = user;
            return true;

        } catch (e) {
            throw new UnauthorizedException('The user is not registred yet');
        }
  }
}

