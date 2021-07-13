import { Controller, Get, Post, Body, Param, Render, Req, Request } from "@nestjs/common";
import { AppService } from './app.service';
import { CertificateDto } from "./models/certificate.dto";
import * as rawbody from 'raw-body';
import { randomInt } from "crypto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root() {
    // return { message: 'Hello world!' };
  }

  @Get('getCertificate/:contractId')
  async getCertificate(@Param('contractId') contractId): Promise<CertificateDto> {
    return this.appService.getCertificate(contractId);
  }

  // @Post('createCertificate')
  //   postCreateCertificate(@Body() certificateDto: CertificateDto){
  //   console.log("Debug 1")
  //   return this.appService.postCreateCertificate(certificateDto);
  // }

/*  @Get('getAllCertificate')
  async getAllCertificate(): Promise<String> {
    return this.appService.getAllCertificate();
  }*/

  @Post('createCertificate')
  @Render('pdf')
  async signup(@Body() data): Promise<CertificateDto> {
    let certificate = new CertificateDto();

    if (data.readable) {
      // body is ignored by NestJS -> get raw body from request
      const raw = await rawbody(data);
      const text = raw.toString().trim();
      console.log('body:', text);

    } else {
      // body is parsed by NestJS
      console.log('data:', data);
      certificate.fullName = data.fullName;
      certificate.courseName = data.courseName;
      certificate.courseTime = data.courseTime;
      certificate.courseDate = '13-07-2021'
      certificate.period = data.period;
      certificate.average = data.average;
      certificate.state = parseInt(certificate.average) >= 11 ? 'Aprobado' : 'Desaprobado';
      certificate.certificateNumber = 'MG30-' + data.period + '-' + Math.floor(Math.random() * (Math.floor(1000) - Math.ceil(1) + 1)) + Math.ceil(1);
    }
    return this.appService.postCreateCertificate(certificate);
  }

}
