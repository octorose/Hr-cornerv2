import mongoose, { Document, Model } from "mongoose";

interface Departement {
  Nom: string;
  Description: string;
  manager: string;
}

let Departements: Model<Departement>;

try{
    const DepartementsSchema = new mongoose.Schema<Departement>(
      {
        Nom: String,
        Description: String,
        manager: String,
      },
      { timestamps: { createdAt: "created_at" } }
    );
    Departements = mongoose.model<Departement>("departements", DepartementsSchema);
}catch(error){
    Departements = mongoose.model<Departement>("departements");
}
export default Departements;