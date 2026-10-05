// ==========================================
// Users Types
// ==========================================
export type user_role = 'Submiter' | 'Reviewer';

export interface User {
    id: number,
    name: string,
    email: string,
    password: string,
    role: user_role 
}
export type new_user = Omit<User, 'id'>;


// ==========================================
// Projects Types
// ==========================================
export type submission_status = 'Pending' | 'Rejected' | 'Approved' | 'in_review';

export interface projects {
    id: number,
    name: string,
    description: string,
    userId: number,
    project_status: submission_status,
    created_at: Date
}
export type new_project = Omit<projects, 'id'>;


// ==========================================
// Project Members Types 
// ==========================================
export interface project_member {
    project_id: number;
    user_id: number;
}


// ==========================================
// Code Submissions Types 
// ==========================================
export interface submission {
    id: number;
    project_id: number;
    userid: number;
    code_url: string;
    remarks: string;
    status: submission_status; // Reuses your 'Pending' | 'Rejected' | 'Approved' | 'in_review' enum
    created_at: Date;
}
export type new_submission = Omit<submission, 'id' | 'status' | 'created_at'>;
