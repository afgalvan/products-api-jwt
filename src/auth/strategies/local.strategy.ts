import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { UserResponse } from '../../shared/dto/user.response';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'usernameOrEmail' });
  }

  async validate(
    usernameOrEmail: string,
    password: string,
  ): Promise<UserResponse> {
    const user = await this.authService.validateUser(usernameOrEmail, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
