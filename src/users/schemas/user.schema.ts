import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Role } from "src/roles/schemas/roles.schema";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User{

    @Prop({unique:true, required:true})
    email : string;

    @Prop({required:true})
    password : string;

    @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' } })
    roles: Role;

}

export const UserSchema = SchemaFactory.createForClass(User);