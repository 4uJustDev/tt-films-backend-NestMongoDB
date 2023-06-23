import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { ObjectId } from "mongoose";
import { User } from "src/users/schemas/user.schema";

export type RoleDocument = Role & Document;


@Schema({ timestamps: true })
export class Role{

    @Prop({unique:true, required:true})
    value: string;

    @Prop()
    description : string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    users : User[];


}

export const RoleSchema = SchemaFactory.createForClass(Role);