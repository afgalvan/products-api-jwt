import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import jwtConfig from '../../config/jwt.config';

export interface Payload {
  id: string;
}

interface ValidateResponse {
  userId: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.SECRET,
    });
  }

  async validate(payload: Payload): Promise<ValidateResponse> {
    return { userId: payload.id };
  }
}
