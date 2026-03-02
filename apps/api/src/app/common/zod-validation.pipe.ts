import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodType, infer as zInfer } from 'zod';

export class ZodValidationPipe<T extends ZodType>
  implements PipeTransform<unknown, zInfer<T>>
{
  constructor(private schema: T) {}

  transform(value: unknown): zInfer<T> {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));

      throw new BadRequestException({
        message: 'Validation failed',
        errors,
      });
    }

    return result.data;
  }
}
