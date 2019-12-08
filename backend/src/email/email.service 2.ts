import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EmailDto } from './email.dto';

@Injectable()
export class EmailService {

    transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
          user: 'amostuproject@gmail.com',
          pass: 'Amos$Project01',
        },
      });

    async sendEmails(emailDto : EmailDto){
        const destinations = emailDto.destinations;
        const text = emailDto.text;
        const subject = emailDto.subject;
        const arrayOfPromises = [];
        destinations.forEach((destination) => {
            const mailOptions = {
                from: 'amostuproject@gmail.com',
                to: destination,
                subject: subject,
                text: text,
              };
              const emailPromise = this.sendSingleEmail(mailOptions);
              arrayOfPromises.push(emailPromise);
        });
        try{
            await Promise.all(arrayOfPromises);
            console.log("success");
            return "success";
        }catch(e){
            console.log("Error", e);
            return "error" + e.toString();

        }
    }

    private sendSingleEmail(mailOptions){
        return new Promise((resolve, reject) =>{
            this.transporter.sendMail(mailOptions)
            .then((res) => resolve(res))
            .catch((e) => reject(e));
        });
    }
}
