import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

@Module({
    imports: [JwtModule.register({
        global: true,
        secret: '716f925b8fc42ac54bd726d2a424550af5cea212',
        signOptions: { expiresIn: '120000000s' },
    }),],
    exports: [],
    providers: [AuthGuard]
})
export class AuthModule { }
