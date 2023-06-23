import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, { ObjectId } from "mongoose";
import { Role } from "./roles.schema";
import { User } from "src/users/schemas/user.schema";

export type UserRolesDocument = UserRoles & Document;

@Schema()
export class UserRoles{

    @Prop({type:mongoose.Schema.Types.ObjectId, ref: "Role"})
    roleId: ObjectId;

    @Prop({type:mongoose.Schema.Types.ObjectId, ref: "User"})
    userId : ObjectId;


}

export const UserRolesSchema = SchemaFactory.createForClass(UserRoles);