import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/service/user.service';


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);
    if (user && this.comparePasswords(pass, user.password)) {
      const { password, ...result } = user;
      console.log(result);
      return result;
    }
    return null;
  }

  async login(req: any) {
    const payload = { email: req.email, sub: req.id };
    const user = await this.userService.getUserById(req.id as string);
    //console.log(payload);
    return {
      access_token: this.jwtService.sign(payload),
      id: req.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: req.email,
    };
  }

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  comparePasswords(inputPassword: string, hashPassword: string): boolean {
    return bcrypt.compareSync(inputPassword, hashPassword);
  }
}
