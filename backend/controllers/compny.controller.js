import { Company } from "../models/company.model.js";

/**
 * Register a new company
 */
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      return res.status(400).json({
        message: "Company name required",
        success: false
      });
    }

    const existingCompany = await Company.findOne({ name: companyName });

    if (existingCompany) {
      return res.status(400).json({
        message: "Company with this name already exists",
        success: false
      });
    }

    const company = await Company.create({
      name: companyName,
      userId: req.id
    });

    return res.status(201).json({
      message: "Company registered successfully",
      company,
      success: true
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

/**
 * Get all companies created by logged-in user
 */
export const getCompany = async (req, res) => {
  try {
    const userId = req.id;

    const companies = await Company.find({ userId });

    if (companies.length === 0) {
      return res.status(404).json({
        message: "No companies found",
        success: false
      });
    }

    return res.status(200).json({
      companies,
      success: true
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

/**
 * Get company by ID
 */
export const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await Company.findById(id);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false
      });
    }

    return res.status(200).json({
      company,
      success: true
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

/**
 * Update company details (only owner can update)
 */
export const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, website, location } = req.body;

    const updateData = {
      name,
      description,
      website,
      location
    };

    const company = await Company.findOneAndUpdate(
      { _id: id, userId: req.id }, // ownership check
      updateData,
      { new: true }
    );

    if (!company) {
      return res.status(404).json({
        message: "Company not found or unauthorized",
        success: false
      });
    }

    return res.status(200).json({
      message: "Company information updated successfully",
      success: true
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};
