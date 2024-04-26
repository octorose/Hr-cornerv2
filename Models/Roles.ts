import mongoose from "mongoose";
interface Role {
    Role: string;
    Departement: string;
    Date_Creation: string;
}
let roles = mongoose.model<Role>("roles");
try {
    const RolesSchema = new mongoose.Schema<Role>({
        Role: String,
        Departement: String,
        Date_Creation: String,
    });
    roles = mongoose.model<Role>("roles", RolesSchema);
}
catch (error) {
    roles = mongoose.model<Role>("roles");
}
export default roles;
