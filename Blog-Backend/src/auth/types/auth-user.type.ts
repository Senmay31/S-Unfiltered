import { UserRole } from "src/common/enums/role.enums";

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
}
