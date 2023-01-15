import { IsString } from 'class-validator';

/**
 * @description 필요없는 type 정의이긴 한데 나중에 이 데이터가 필요할수 있어서 정의해놓음
 */
export class SlackSlashRequestDto {
  @IsString()
  token: string;

  @IsString()
  team_id: string;

  @IsString()
  team_domain: string;

  @IsString()
  channel_id: string;

  @IsString()
  channel_name: string;

  @IsString()
  user_id: string;

  @IsString()
  user_name: string;

  @IsString()
  command: string;

  /**
   * IsEnum() 데코레이터를 사용하여 enum 타입을 검증하지 않는 이유:
   * slack 에 적절한 메시지를 보내기 위해선 200 응답과 같이 보내야 한다.
   */
  @IsString()
  text: string;

  @IsString()
  api_app_id: string;

  @IsString()
  is_enterprise_install: string;

  @IsString()
  response_url: string;

  @IsString()
  trigger_id: string;
}
