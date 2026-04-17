export class BaseResponseDto {
  constructor(success = true) {
    this.success = success;
  }

  success: boolean;
}
