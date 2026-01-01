import Job from "../models/job.model.js";

/* =========================
   POST A NEW JOB
========================= */
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId
    } = req.body;

    // Validation
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: Array.isArray(requirements)
        ? requirements
        : requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: String(experience),
      position,
      company: companyId,
      created_by: req.id // comes from auth middleware
    });

    return res.status(201).json({
      success: true,
      message: "New job created",
      job
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error"
    });
  }
};

/* =========================
   GET ALL JOBS (SEARCH)
========================= */
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { location: { $regex: keyword, $options: "i" } }
      ]
    };

    const jobs = await Job.find(query)
      .populate("company")
      .sort({ createdAt: -1 });

    if (jobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Jobs not found"
      });
    }

    return res.status(200).json({
      success: true,
      jobs
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error"
    });
  }
};

/* =========================
   GET JOB BY ID                                        
========================= */
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate("company");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    return res.status(200).json({
      success: true,
      job
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error"
    });
  }
};


/* =========================
   GET JOBS POSTED BY ADMIN
========================= */
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;

    const jobs = await Job.find({ created_by: adminId })
      .populate("company")
      .sort({ createdAt: -1 });

    if (jobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Jobs not found"
      });
    }

    return res.status(200).json({
      success: true,
      jobs
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error"
    });
  }
};
