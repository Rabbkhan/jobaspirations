import {
  applyRecruiter,
  approveRecruiter,
  getAllRecruiterApplications,
  getMyApplication,
  rejectRecruiter,
} from "../services/recruiter.service.js";

export const applyRecruiterController = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      companyname,
      companyEmail,
      website,
      companyLinkedin,
      employees,
      location,
      description,
      linkedinProfile,
    } = req.body;

    const file = req.file; // multer adds this

    const application = await applyRecruiter(
      userId,
      {
        companyname,
        companyEmail,
        website,
        companyLinkedin,
        employees,
        location,
        description,
        linkedinProfile,
      },
      file,
    );

    res.json({ success: true, application });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getRecruiterApplicationsController = async (req, res) => {
  try {
    const applications = await getAllRecruiterApplications();

    res.json({
      success: true,
      applications,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const approveRecruiterController = async (req, res) => {
  try {
    const { id } = req.params; // applicationId
    const application = await approveRecruiter(id);
    res.json({ success: true, application });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const rejectRecruiterController = async (req, res) => {
  try {
    const { id } = req.params; // applicationId
    const { reason } = req.body; // optional

    const application = await rejectRecruiter(id, reason);

    res.json({
      success: true,
      message: "Recruiter application rejected",
      application,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const getMyApplicationController = async (req, res) => {
  try {
    const application = await getMyApplication(req.user._id);
    res.json({ success: true, application }); // null if none
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
