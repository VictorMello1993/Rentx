import { injectable } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import { SES } from 'aws-sdk';
import { IMailProvider } from '../IMailProvider';

@injectable()
class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.createClient();
  }

  private async createClient() {
    try {
      this.client = nodemailer.createTransport({
        SES: new SES({
          apiVersion: '2010-12-01',
          region: process.env.AWS_REGION,
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID,
        }),
      });
    } catch (err) {
      console.error(`SESMailError - Error:\n${err}`);
    }
  }

  async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
    if (!this.client) {
      await this.createClient();
    }

    const templateFileContent = fs.readFileSync(path).toString('utf-8');
    const templateParse = handlebars.compile(templateFileContent);
    const templateHTML = templateParse(variables);

    await this.client.sendMail({
      to,
      from: 'Rentx <victorsmello93@gmail.com>',
      subject,
      html: templateHTML,
    });
  }
}

export { SESMailProvider };
