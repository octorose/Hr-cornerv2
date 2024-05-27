import mongoose, { Document, Model } from "mongoose";

interface User {
  Username: string;
  Password: string;
  Role: string;
}

let Users: Model<User>;

try {
  const UserssSchema = new mongoose.Schema<User>(
    {
        Username: String,
        Password: String,
        Role: String,
    },
    { timestamps: { createdAt: "created_at" } }
  );
  Users = mongoose.model<User>("users", UserssSchema);
} catch (error) {
  Users = mongoose.model<User>("users");
}
export default Users;

