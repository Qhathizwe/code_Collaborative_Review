import { Request, Response } from "express";
import * as subServices from "../services/submissionServices";

// 1. Create submission (/api/submissions)
export const addSubmission = async (req: Request, res: Response) => {
    try {
        const loggedInUserId = req.tokenData?.userId;
        if (!loggedInUserId) {
            return res.status(401).json({ message: "Unauthorized. Missing token session." });
        }

        const { project_id, code_url, remarks } = req.body;
        if (!project_id || !code_url) {
            return res.status(400).json({ message: "project_id and code_url are required." });
        }

        const newSubmission = await subServices.createSubmission({
            project_id: parseInt(project_id),
            userid: loggedInUserId,
            code_url,
            remarks
        });

        return res.status(201).json(newSubmission);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error adding code submission." });
    }
};

// 2. List submissions by project (/api/projects/:id/submissions)
export const getSubmissionsByProject = async (req: Request, res: Response) => {
    try {
        const projectId = parseInt(req.params.id as string);
        const list = await subServices.findSubmissionsByProject(projectId);
        return res.status(200).json(list);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error retrieving submissions." });
    }
};

// 3. View single submission (/api/submissions/:id)
export const getSingleSubmission = async (req: Request, res: Response) => {
    try {
        const subId = parseInt(req.params.id as string);
        const submission = await subServices.findSubmissionById(subId);
        
        if (!submission) {
            return res.status(404).json({ message: "Submission not found." });
        }
        return res.status(200).json(submission);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error retrieving submission details." });
    }
};

// 4. Update submission status (/api/submissions/:id/status)
export const modifySubmissionStatus = async (req: Request, res: Response) => {
    try {
        const subId = parseInt(req.params.id as string);
        const { status } = req.body; // e.g., 'approved' or 'rejected'

        if (!status) {
            return res.status(400).json({ message: "Status state is required." });
        }

        const updated = await subServices.updateStatus(subId, status);
        if (!updated) {
            return res.status(404).json({ message: "Submission not found to update." });
        }
        return res.status(200).json(updated);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating status." });
    }
};

// 5. Delete submission (/api/submissions/:id)
export const deleteSubmission = async (req: Request, res: Response) => {
    try {
        const subId = parseInt(req.params.id as string);
        await subServices.removeSubmission(subId);
        return res.status(200).json({ message: "Submission deleted successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error removing submission." });
    }
};
