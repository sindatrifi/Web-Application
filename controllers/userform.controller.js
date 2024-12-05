
const CandidatForm = require('../models/candidatformulaire.models');

// Function to add a candidatform
async function Addcandidatform(candidatformData) {
  try {
    const candidatform = await CandidatForm.create(candidatformData);
    return candidatform;
  } catch (error) {
    console.error(error.message);
    throw new Error('Failed to create candidatform');
  }
}

// Function to update a candidatform
async function Updatecandidatform(candidatFormId, candidatformData) {
  try {
    const updatedCandidatForm = await CandidatForm.findByIdAndUpdate(candidatFormId, candidatformData, { new: true });
    return updatedCandidatForm;
  } catch (error) {
    console.error(error.message);
    throw new Error('Failed to update candidatform');
  }
}

module.exports = { Addcandidatform, Updatecandidatform };