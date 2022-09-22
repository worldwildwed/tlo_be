// ---------- USE roleGuard INSTEAD ------------------ //


// import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';

// export enum Role {
//   USER = 0,
//   ADMIN = 7,
//   SUPER = 8,
//   MASTER = 9
// }

// @Injectable()
// export class PermissionGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean{
//     const [req] = context.getArgs()
//     console.log('<Permission Guard Check>')
//     console.table(req.user)
//     // console.log(req?.user || 'No User in Request')
//     // const userPermission = req?.user?.permission
//     const { userid, role, username } = req?.user || {}
//     if (role > 0) 
//       return true
//     else 
//       throw new ForbiddenException('RBAC denied')
//   }
// }
