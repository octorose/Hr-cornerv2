import mongoose, { Document, Model } from "mongoose";
interface Pr{
    Pr_Id:number,
    Departement:string,
    Poste_a_pourvoir:string,
    Cloture:string,
    Validation_date:string
}
let pr:Model<Pr>;
try{
    const prSchema = new mongoose.Schema<Pr>({
        Pr_Id:Number,
        Departement:String,
        Poste_a_pourvoir:String,
        Cloture:String,
        Validation_date:String
    },{collection:"pr"});
    pr = mongoose.model<Pr>("pr",prSchema);
}
catch(error){
    pr = mongoose.model<Pr>("pr");
}
export default pr;
