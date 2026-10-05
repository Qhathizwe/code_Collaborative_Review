import { query } from "../config/database";
import { projects, new_project } from "../types/app.types";
import { submission_status } from "../types/app.types";

export const createProjectTable = async (): Promise<void> => {
    try {
        await query(
          `CREATE TABLE IF NOT EXISTS projects(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            description VARCHAR(200) NOT NULL,
            userid INT REFERENCES Users(id) ON DELETE CASCADE, --  Changed to lowercase 'userid'
            project_status submission_status DEFAULT 'Pending',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          )`
        );
        console.log("Projects table created successfully!");
    } catch (error) {
        console.log('Failed to create Projects table:', error);
    }
};

export const createProject = async (projectData: new_project): Promise<projects> => {
    await createProjectTable();

    // Destructure using 'userId' from your TypeScript type, but map it carefully below
    const { name, description, userId, project_status, created_at } = projectData;
    
    // Fixed: Explicitly targeted the lowercase column name 'userid' in the INSERT query
    const { rows } = await query(
        "INSERT INTO projects (name, description, userid, project_status, created_at) VALUES (\$1, \$2, \$3, \$4, \$5) RETURNING *",
        [name, description, userId, project_status || 'pending', created_at || new Date()]
    );
    return rows[0];
};

export const findAllProjects = async (): Promise<projects[]> => {
    const { rows } = await query(
        "SELECT * FROM projects ORDER BY id ASC",
    );
    return rows;
};
export const createProjectMembersTable = async (): Promise<void> => {
    try {
        await query(
          `CREATE TABLE IF NOT EXISTS project_members(
            project_id INT REFERENCES projects(id) ON DELETE CASCADE,
            user_id INT REFERENCES Users(id) ON DELETE CASCADE,
            PRIMARY KEY (project_id, user_id)
          )`
        );
    } catch (error) {
        console.log('Failed to create project_members table:', error);
    }
};

export const assignMemberToProject = async (projectId: number, userId: number): Promise<void> => {
    await createProjectMembersTable();
    await query(
        "INSERT INTO project_members (project_id, user_id) VALUES (\$1, \$2) ON CONFLICT DO NOTHING",
        [projectId, userId]
    );
};

export const removeMemberFromProject = async (projectId: number, userId: number): Promise<void> => {
    await query(
        "DELETE FROM project_members WHERE project_id = \$1 AND user_id = \$2",
        [projectId, userId]
    )
};