/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService){}
    
    async signup(dto: AuthDto){
        // generate password
        const hash = await argon.hash(dto.password);

        // save new user in db

        try{
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                },
                // show only the following fiedls
                // select: {
                //     id: true,
                //     email: true,
                //     createdAt: true,
                // }
            });
            // or delete only a specific field
            delete user.hash;
    
            return user;
        } catch(error){
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code == 'P2002') {
                    throw new ForbiddenException('Email already taken')
                }
            }
            throw error;
        }
        // return saved user credentials
        
    }

    signin() {}
}
