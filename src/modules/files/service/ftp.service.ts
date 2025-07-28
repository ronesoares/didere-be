import { Injectable } from '@nestjs/common';
import * as ftp from 'ftp';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FtpService {
  private ftpClient: ftp;

  constructor(private configService: ConfigService) {
    this.ftpClient = new ftp();
  }

  private async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ftpClient.connect({
        host: this.configService.get('FTP_SERVER').replace('ftp://', ''),
        user: this.configService.get('FTP_USER'),
        password: this.configService.get('FTP_PASSWORD'),
      });

      this.ftpClient.on('ready', () => {
        resolve();
      });

      this.ftpClient.on('error', (err) => {
        reject(err);
      });
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    await this.connect();

    const remotePath = `${this.configService.get('FTP_LOCAL_PATH')}${file.originalname}`;

    return new Promise((resolve, reject) => {
      this.ftpClient.put(file.buffer, remotePath, (err) => {
        this.ftpClient.end();
        if (err) {
          reject(err);
        } else {
          resolve(remotePath);
        }
      });
    });
  }

  async downloadFile(fileName: string): Promise<Buffer> {
    await this.connect();

    const remotePath = `${this.configService.get('FTP_LOCAL_PATH')}${fileName}`;

    return new Promise((resolve, reject) => {
      this.ftpClient.get(remotePath, (err, stream) => {
        if (err) {
          this.ftpClient.end();
          reject(err);
          return;
        }

        const chunks: Buffer[] = [];
        stream.on('data', (chunk) => {
          chunks.push(chunk);
        });

        stream.on('end', () => {
          this.ftpClient.end();
          resolve(Buffer.concat(chunks));
        });

        stream.on('error', (err) => {
          this.ftpClient.end();
          reject(err);
        });
      });
    });
  }

  async deleteFile(fileName: string): Promise<void> {
    await this.connect();

    const remotePath = `${this.configService.get('FTP_LOCAL_PATH')}${fileName}`;

    return new Promise((resolve, reject) => {
      this.ftpClient.delete(remotePath, (err) => {
        this.ftpClient.end();
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

