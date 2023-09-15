import { ObjectId } from "mongoose";

export class AddRoleDto{
    readonly value: string;
    readonly userId: ObjectId;
}