import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstant } from '../constants/constants';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstant.secret
    });
  }

  async validate(jwtPayload: { sub: number }) {
    const user = await this.userService.findById(jwtPayload.sub);

    if (!user) {
      throw new Error()
    }

    return user;
  }
}