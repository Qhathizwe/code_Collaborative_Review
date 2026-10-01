import { query } from "../config/database";
import { User, new_user } from '../types/app.types'
import bcrypt from "bcryptjs";

export const createUsersTable = async (): Promise<void> => {
    const { rows } = await query(
      ` CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(200) UNIQUE NOT NULL,
        password_hash VARCHAR(100)  NOT NULL,
		role user_role DEFAULT 'Submiter'
        )`);
    try {
        console.log("Creating tables")
        console.log("Users table created successfully!")
    } catch (error) {
        console.log('failed to Users create table')
    }
};

export const createUser = async (userData: new_user): Promise<User> => {
    const { name, email, password, role } = userData;
    const encrypt = await bcrypt.genSalt(10)
    const password_hash = await bcrypt.hash(password, encrypt)
    
    const { rows } = await query(
        "INSERT INTO Users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING*",
        [name, email, password_hash, role]
    );
    return rows[0];
};

export const findAllUsers = async (): Promise<User[]> => {
    const { rows } = await query(
        "SELECT * FROM Users ORDER BY id ASC",
    );
    return rows
}

export const findUserById = async (id: number):
    Promise<User | null> => {
    const { rows } = await query(
        "SELECT * FROM Users WHERE id = $1", [id]
    )
    return rows[0] || null;
};

export const updateUser = async (id: number, userData :Partial<User>):
    Promise<User | null> => {
    const { name, email, password, role } = userData;
    const { rows } = await query(
       `UPDATE Users 
         SET name = COALESCE($1, name), 
             email = COALESCE($2, email), 
             password = COALESCE($3, password), 
             role = COALESCE($4, role)
         WHERE id = $5
         RETURNING *`,
       [name, email, password, role, id]

    );
    return rows[0] || null
};

export const deleteUser = async (id: number):
    Promise<User | null> =>{
        const { rows } = await query(
           "DELETE FROM Users WHERE id = $1 RETURNING * ",[id]
        )
        return rows[0] || null
}