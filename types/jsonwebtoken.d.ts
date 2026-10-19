declare module "jsonwebtoken" {
  export interface SignOptions {
    expiresIn?: string | number;
    [key: string]: unknown;
  }
  export interface VerifyOptions { [key: string]: unknown }
  export function sign(payload: string | object | Buffer, secretOrPrivateKey: string | Buffer, options?: SignOptions): string;
  export function verify(token: string, secretOrPublicKey: string | Buffer, options?: VerifyOptions): string | object;
  const jwt: { sign: typeof sign; verify: typeof verify };
  export default jwt;
}
