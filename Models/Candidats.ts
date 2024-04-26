import mongoose, { Document, Model } from "mongoose";
interface Candidate {
  ID: number;
  Nom: string;
  Prenom: string;
  Date_naissance: string;
  CV_Select: string;
  Date_CV_Selection: string;
  Sexe: string;
  Addresse: string;
  manager: string;
  Experience: number;
  Pr_ID: number;
  Type_contract: string;
  Status: string;
  Date_creation_Contract: string;
  ApplicationSource: string;
  Accepted: string;
  AcceptedE1: string;
  AcceptedE2: string;
  AcceptedE3: string;
}
let Candidats = mongoose.model<Candidate>("candidats");
// Register the "Candidats" model with the correct casing
try {
   const CandidatsSchema = new mongoose.Schema<Candidate>({
      ID: Number,
      Nom: String,
      Prenom: String,
      Date_naissance: String,
      CV_Select: String,
      Date_CV_Selection: String,
      Sexe: String,
      Addresse: String,
      manager: String,
      Experience: Number,
      Pr_ID: Number,
      Type_contract: String,
      Status: String,
      Date_creation_Contract: String,
      ApplicationSource: String,
      Accepted: String,
      AcceptedE1: String,
      AcceptedE2: String,
      AcceptedE3: String,
   });
   Candidats = mongoose.model<Candidate>("candidats", CandidatsSchema);
} catch (error) {
   Candidats = mongoose.model<Candidate>("candidats");
}
export default Candidats;
