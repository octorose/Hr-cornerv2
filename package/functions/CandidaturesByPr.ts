import Candidats from "../../Models/Candidats";
import Pr from "../../Models/Pr"; // Assuming you have a Pr model
import connect from "../MongoDb/db";

export const CandidaturesByPr = async () => {
  try {
    // Connect to the MongoDB database
    await connect();

    // Get all unique Pr IDs
    const prIds = await Pr.distinct("Pr_Id");

    // Perform a left outer join with Candidats collection to count the number of candidatures for each Pr ID
    const savedCandidature = await Promise.all(
      prIds.map(async (prId) => {
        const totalCandidature = await Candidats.countDocuments({
          Pr_ID: prId,
        });
        return { Pr_ID: prId, totalCandidature };
      })
    );

    return savedCandidature;
  } catch (error) {
    console.error(error);
  }
};
