import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreatePromotionDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  type?: string; // เช่น "time-based", "discount"

  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  items?: any; // ✅ JSON object เช่น {"1h":50,"3h":100,"5h":230}

  @IsOptional()
  startTime?: string;

  @IsOptional()
  endTime?: string;

  @IsOptional()
  validDays?: any; // ✅ JSON array เช่น ["mon","tue"]

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  icon?: string;
}
