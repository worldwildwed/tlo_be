import { CanActivate, ExecutionContext, Injectable, ForbiddenException, mixin } from '@nestjs/common';

export enum Role {
    USER = 0,
    ADMIN = 7,
    SUPER = 8,
    MASTER = 9
  }

export const RoleGuard = (allow: Role) => {
    class RoleGuardMixin implements CanActivate {
        canActivate(
            context: ExecutionContext,
          ): boolean{
            const [req] = context.getArgs()
            console.log('<Role Guard Check>')
            console.table(req.user)
            // console.log(req?.user || 'No User in Request')
            // const userPermission = req?.user?.permission
            const { userid, role, username } = req?.user || {}
            if (role >= allow) 
              return true
            else 
              throw new ForbiddenException('RBAC denied')
          }
    }
  
    const guard = mixin(RoleGuardMixin);
    return guard;
  }