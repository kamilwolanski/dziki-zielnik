import { PipeTransform, BadRequestException } from "@nestjs/common";
import { ZodType, infer as zInfer } from "zod";

export class ZodValidationPipe<T extends ZodType>
  implements PipeTransform<unknown, zInfer<T>>
{
  constructor(private schema: T) {}

  transform(value: unknown): zInfer<T> {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      throw new BadRequestException(result.error.flatten());
    }

    return result.data;
  }
}
