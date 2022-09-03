export interface UserInfo {
  code: string;
  env: string;
  message: string;
  payload: Payload[];
  time: number;
  version: string;
}

export interface Payload {
  queueId?: string;
  game?: string;
  region?: string;
  queueName?: string;
  userId?: string;
  nickname?: string;
  skillLevel?: number;
  selection?: any;
}
