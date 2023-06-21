import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes,  } from "mongoose";

export type FilmDocument = Film & Document;

@Schema({timestamps:true})
export class Film{

    @Prop({})
    tittle: string;

    @Prop({})
    description : string;

}

export const FilmSchema = SchemaFactory.createForClass(Film);
