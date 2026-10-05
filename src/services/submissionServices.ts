import { query } from "../config/database";

export const createSubmissionsTable = async (): Promise<void> => {
    try {
        await query(
          `CREATE TABLE IF NOT EXISTS submissions(
            id SERIAL PRIMARY KEY,
            project_id INT REFERENCES projects(id) ON DELETE CASCADE,
            userid INT REFERENCES Users(id) ON DELETE CASCADE,
            code_url VARCHAR(500) NOT NULL,
            reviews VARCHAR(200) ,
            status submission_status DEFAULT 'Pending',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          )`
        );
         console.log("Submissions table created successfully!");
    } catch (error) {
        console.error('Failed to create submissions table:', error);
    }
};

export const createSubmission = async (data: { project_id: number; userid: number; code_url: string; remarks?: string }) => {
   
    const { rows } = await query(
        `INSERT INTO submissions (project_id, userid, code_url, remarks) 
         VALUES (\$1, \$2, \$3, \$4) RETURNING *`,
        [data.project_id, data.userid, data.code_url, data.remarks || '']
    );
    return rows[0];
};

export const findSubmissionsByProject = async (projectId: number) => {
    const { rows } = await query(
        "SELECT * FROM submissions WHERE project_id = \$1 ORDER BY created_at DESC",
        [projectId]
    );
    return rows;
};

export const findSubmissionById = async (id: number) => {
    const { rows } = await query("SELECT * FROM submissions WHERE id = \$1", [id]);
    return rows[0];
};

export const updateStatus = async (id: number, status: string) => {
    const { rows } = await query(
        "UPDATE submissions SET status = \$1 WHERE id = \$2 RETURNING *",
        [status, id]
    );
    return rows[0];
};

export const removeSubmission = async (id: number) => {
    await query("DELETE FROM submissions WHERE id = \$1", [id]);
    return true;
};
