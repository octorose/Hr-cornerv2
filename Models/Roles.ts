import mongoose, { Document, Model } from "mongoose";

interface Role {
    Role: string;
    Departement: string;
    Date_Creation: string;
}

let Roles: Model<Role>;

try {
  const RolesSchema = new mongoose.Schema<Role>(
    {
    Role: String,
    Departement: String,
    // Date_Creation: String
},
    { timestamps: { createdAt: "created_at" } }
  );
  Roles = mongoose.model<Role>("roles", RolesSchema);
} catch (error) {
  Roles = mongoose.model<Role>("roles");
}
export default Roles;
