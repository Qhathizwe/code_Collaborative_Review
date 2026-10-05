import { query } from "../config/database";
import { comment, new_comment } from "../types/app.types";

export const createCommentsTable = async (): Promise<void> => {
    try {
        await query(
            `CREATE TABLE IF NOT EXISTS comments (
            id SERIAL PRIMARY KEY,
            submissionid INT REFERENCES submission(id) ON DELETE CASCADE,
            in_line VARCHAR(200),
            general VARCHAR(300)
            )`
        );
        console.log("Comments table created successfully!");
    } catch (error) {
        console.error('Failed to create submissions table:', error);
    }
}

export const createCommentsBySubmissions = async (appData: new_comment): Promise<comment> => {
    const { submissionId, in_line, general} = appData;
    const { rows } = await query(
        `INSERT INTO comments
(submissionId, userId, content, type)
VALUES ($1, $2, $3, $4) RETURNING *`,
        [submissionId, in_line, general]
    );
    return rows[0];
};

export const getCommentsBySubmissionId = async (submissionId: number): Promise<comment[]> => {
    const { rows } = await query(
        `SELECT * FROM comments
WHERE submissionId = $1`,
        [submissionId]
    );
    return rows;
};

export const updateCommentById = async (id: number, content: string): Promise<comment | null> => {
    const { rows } = await query(
        `UPDATE comments SET content = $1 WHERE id = $2 RETURNING *`,
        [content, id]
    );
    return rows[0] || null;
};

export const deleteCommentById = async (id: number): Promise<comment | null> => {
    const { rows } = await query(
        `DELETE FROM comments WHERE id = $1 RETURNING *`,
        [id]
    );
    return rows[0] || null;
};