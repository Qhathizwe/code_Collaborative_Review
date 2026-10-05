import { Request, Response } from 'express';
import * as commentService from '../services/commentsServices';

export const addComment = async (req: Request, res: Response) => {
    try {
        const newComment = await commentService.createCommentsBySubmissions(req.body);
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const getCommentsBySubmissionId = async (req: Request, res: Response) => {
    try {
        const submissionId = parseInt(req.params.submissionId as string);
        const comments = await commentService.getCommentsBySubmissionId(submissionId);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const updateCommentById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string);
        const { content } = req.body;
        const updatedComment = await commentService.updateCommentById(id, content);
        if (!updatedComment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const deleteCommentById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string);
        const deletedComment = await commentService.deleteCommentById(id);
        if (!deletedComment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        res.status(200).json(deletedComment);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};