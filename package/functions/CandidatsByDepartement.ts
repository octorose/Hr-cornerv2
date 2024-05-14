import Candidats from '../../Models/Candidats';
import Departements from '../../Models/Departements';
import connect from "../MongoDb/db";

export const CandidateByDepartment = async () => {
  try {
    await connect();

    // Aggregate to join Candidates and PR collections
    const result = await Candidats.aggregate([
      // Join Candidates with PR collection based on Pr_ID
      {
        $lookup: {
          from: "pr",
          localField: "Pr_ID",
          foreignField: "Pr_Id",
          as: "matched_docs",
        },
      },
      // Unwind the matched_docs array
      { $unwind: "$matched_docs" },
      // Group by Department and count the number of candidates
      {
        $group: {
          _id: "$matched_docs.Departement",
          totalCandidates: { $sum: 1 },
        },
      },
    ]);
    return result;
  } catch (error) {
    console.error(error);
  }
};