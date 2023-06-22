import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User{

    @Prop({unique:true, required:true})
    username: string;

    @Prop({unique:true, required:true})
    email : string;

    @Prop({required:true})
    password : string;

}

export const UserSchema = SchemaFactory.createForClass(User);