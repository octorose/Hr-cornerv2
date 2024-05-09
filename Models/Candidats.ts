import mongoose, { Document, Model } from "mongoose";
interface Candidate {
  ID: string;
  Nom: string;
  Prenom: string;
  Date_naissance: string;
  CV_Select: string;
  Date_CV_Selection: string;
  Sexe: string;
  Addresse: string;
  manager: string;
  Pr_ID: number;
  Type_contract: string;
  Status: string;
  Date_creation_Contract: string;
  ApplicationSource: string;
  Accepted: string;
  Candidat_Decline: string;
  AcceptedE1: string;
  AcceptedE2: string;
  AcceptedE3: string;
}
let Candidats : Model<Candidate>;
// Register the "Candidats" model with the correct casing
try {
   const CandidatsSchema = new mongoose.Schema<Candidate>({
      ID: String,
      Nom: String,
      Prenom: String,
      Date_naissance: String,
      CV_Select: String,
      Date_CV_Selection: String,
      Sexe: String,
      Addresse: String,
      manager: String,
      Pr_ID: Number,
      Type_contract: String,
      Status: String,
      Date_creation_Contract: String,
      ApplicationSource: String,
      Accepted: String,
      Candidat_Decline: String,
      AcceptedE1: String,
      AcceptedE2: String,
      AcceptedE3: String,
   });
   Candidats = mongoose.model<Candidate>("candidats", CandidatsSchema);
} catch (error) {
   Candidats = mongoose.model<Candidate>("candidats");
}
export default Candidats;
