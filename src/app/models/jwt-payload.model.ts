import { ERoles } from "./roles.model";

export interface IJwtPayload {
role:ERoles;
sub:string;//correo
iat:any;
exp:any
}