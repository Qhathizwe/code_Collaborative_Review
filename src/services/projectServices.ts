import { query } from "../config/database";
import { projects, new_project } from "../types/app.types";

import { submission_status } from "../types/app.types";

export const createProjectTable = async (): Promise<void> => {
    const { rows } = await query(
      ` CREATE TABLE IF NOT EXISTS projects(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description VARCHAR(200) NOT NULL,
        userId INT REFERENCES Users(id) ON DELETE CASCADE,
		project_status submission_status DEFAULT 'pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )`);
    try {
        console.log("Projects table created successfully!")
    } catch (error) {
        console.log('Failed to Projects create table')
    }
};

export const createProject = async (projectData: new_project): Promise<projects> => {
     await createProjectTable();

    const { name, description, userId, project_status, created_at } = projectData;
    const { rows } = await query(
        "INSERT INTO projects (name, description, userId, project_status, created_at) VALUES ($1, $2, $3, $4) RETURNING*",
        [name, description, userId, project_status, created_at]
    );
    return rows[0];
};

export const findAllProjects = async (): Promise<projects[]> => {
    const { rows } = await query(
        "SELECT * FROM projects ORDER BY id ASC",
    );
    return rows
}





