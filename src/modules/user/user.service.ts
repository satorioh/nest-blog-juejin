import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { encryptPassword, makeSalt } from "src/utils";
import { Repository } from "typeorm";
import { RegisterDTO } from "./dto/register.dto";
import { LoginDTO } from "./dto/login.dto";
import { User } from "./entity/user.entity";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  /** 校验注册信息 */
  async checkRegisterForm(registerDTO: RegisterDTO): Promise<any> {
    if (registerDTO.password !== registerDTO.passwordRepeat) {
      throw new NotFoundException('两次输入的密码不一致，请检查');
    }
    const { mobile } = registerDTO;
    const hasUser = await this.userRepository
      .createQueryBuilder('user')
      .where('user.mobile = :mobile', { mobile })
      .getOne();
    if (hasUser) {
      throw new NotFoundException('用户已存在');
    }
  }

  /** 注册 */
  async register(registerDTO: RegisterDTO): Promise<any> {
    await this.checkRegisterForm(registerDTO);

    const { nickname, password, mobile } = registerDTO;
    const salt = makeSalt(); // 制作密码盐
    const hashPassword = encryptPassword(password, salt); // 加密密码

    const newUser: User = new User();
    newUser.nickname = nickname;
    newUser.mobile = mobile;
    newUser.password = hashPassword;
    newUser.salt = salt;
    const result = await this.userRepository.save(newUser);
    delete result.password;
    delete result.salt;
    return {
      info: result,
    };
  }

  /** 登陆校验用户信息 */
  async checkLoginForm(loginDTO: LoginDTO): Promise<any> {
    const { mobile, password } = loginDTO;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.salt')
      .addSelect('user.password')
      .where('user.mobile = :mobile', { mobile })
      .getOne();

    if (!user) {
      throw new NotFoundException('用户不存在');
    }
    const { password: dbPassword, salt } = user;
    const currentHashPassword = encryptPassword(password, salt);
    if (currentHashPassword !== dbPassword) {
      throw new NotFoundException('密码错误');
    }
    return user;
  }

  /** 生成 token */
  async certificate(user: User) {
    const payload = {
      id: user.id,
      nickname: user.nickname,
      mobile: user.mobile,
    };
    return this.jwtService.sign(payload);
  }

  async login(loginDTO: LoginDTO): Promise<any> {
    const user = await this.checkLoginForm(loginDTO);
    const token = await this.certificate(user);
    return {
      info: {
        token,
      },
    };
  }
}
