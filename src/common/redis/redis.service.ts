import { createClient, RedisClientType } from 'redis';
import { RedisModules } from '@redis/client';
import { EnvService } from '../env/env.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisService {
  public client: RedisClientType<RedisModules>;

  constructor(private readonly envService: EnvService) {
    this.client = createClient({
      url: this.envService.get('REDIS_URL'),
    });

    this.client.on('error', (error) => {
      console.log('redis error: ', error);
    });

    this.client.connect();
  }

  public async set(key: string, value: string): Promise<void> {
    await this.client.sendCommand([
      'SET',
      key,
      value,
      'EX',
      this.envService.get('REDIS_TTL'),
    ]);
  }

  public async get(key: string): Promise<string> {
    const result = await this.client.sendCommand(['GET', key.toString()]);

    // todo : redis에서 null이나 undefined를 반환할 경우에 대한 처리 (만료된 키로 접근하거나 존재하지 않는 키)
    if (result === null || result === undefined) {
      throw new Error('존재하지 않는 키입니다. 다시 시도해 주세요.');
    }

    return result.toString();
  }
}
