async function getAllJobs(req,res) {
  res.send('getAllJobs')
}
async function getJob(req,res) {
  res.send("getJob")
}
async function createJob(req,res) {
  res.send('createJob')
}
async function updateJob(req,res) {
  res.send("updateJob")
}
async function deleteJob(req,res) {
  res.send("deleteJob")
}


module.exports = {getAllJobs, getJob, createJob, updateJob, deleteJob}