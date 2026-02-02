import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_data: any, ctx: ExecutionContext) => {
    // const request = ctx.switchToHttp().getRequest();
    // console.log('🔥 request.user:', request.user);
    // return request.user;

    if (ctx.getType() === 'http') {
      // ✅ For REST APIs
      return ctx.switchToHttp().getRequest().user;
    }
  },
);
