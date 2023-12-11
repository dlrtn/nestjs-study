export class MemberJwtDto {
  private readonly accessToken: string;
  private readonly refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  public static of(accessToken: string, refreshToken: string): MemberJwtDto {
    return new MemberJwtDto(accessToken, refreshToken);
  }

  public getAccessToken(): string {
    return this.accessToken;
  }

  public getRefreshToken(): string {
    return this.refreshToken;
  }
}
