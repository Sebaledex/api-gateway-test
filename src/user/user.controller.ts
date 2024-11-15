import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClientProxyTest } from 'src/common/proxy/client-proxy';
import { UserDTO } from './dto/user.dto';
import { Observable } from 'rxjs';
import { IUser } from 'src/common/interfaces/user.interface';
import { UserMSG } from 'src/common/constants';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@ApiTags('users')
@UseGuards(JwtAuthGuard)
@Controller('api/v2/user')
export class UserController {
    constructor(private readonly clientProxy: ClientProxyTest) {}
    private _clientProxyUser = this.clientProxy.clientProxy("user");
  
    @Post()
    create(@Body() userDTO: UserDTO): Observable<IUser> {
      return this._clientProxyUser.send(UserMSG.CREATE, userDTO);
    }
  
    @Get()
    findAll(): Observable<IUser[]> {
      return this._clientProxyUser.send(UserMSG.FIND_ALL, '');
    }
  
    @Get(':id')
    findOne(@Param('id') id: string): Observable<IUser> {
      return this._clientProxyUser.send(UserMSG.FIND_ONE, id);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() userDTO: UserDTO): Observable<IUser> {
      return this._clientProxyUser.send(UserMSG.UPDATE, { id, userDTO });
    }
  
    @Delete(':id')
    delete(@Param('id') id: string): Observable<any> {
      return this._clientProxyUser.send(UserMSG.DELETE, id);
    }

    
  }