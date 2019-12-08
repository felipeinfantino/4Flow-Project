import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { EmailDto } from './email/email.dto';
import { EmailService } from './email/email.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly emailService: EmailService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
 
  @Post('/email')
  sendEmail(@Body() email: EmailDto){
    console.log(email);
    if(email.destinations && email.subject && email.text){
      this.emailService.sendEmails(email);
    }else{
      return {error: "error"};
    }
  }
}
