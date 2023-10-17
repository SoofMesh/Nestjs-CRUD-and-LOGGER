import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    let isMatch: any;
    if (user) {
      isMatch = await bcrypt.compare(password, user.password);
      console.log('isMatch--  ', isMatch);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      if (isMatch) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { email, password, ...rest } = user;
        return rest;
      }
    }

    return null;
  }

  async login(user: any) {
    const payload = {
      name: `${user.firstName} ${user.lastName}`,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
