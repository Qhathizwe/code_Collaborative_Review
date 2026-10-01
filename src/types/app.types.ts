//Users types
export type user_role = 'Submiter' | 'Reviewer'

export interface User {
    id: number,
    name: string,
    email: string,
    password: string,
    role: user_role 
}
export type new_user = Omit<User, 'id'>
// // export type update_user = Pick<User, 'name'| 'email' | 'password' |'role'>

//Projects types
export type submission_status = 'Pending' | 'Rejected' | 'Approved' | 'in_review'

export interface projects {
    id: number,
    name: string,
    description: string,
    userId: number,
    project_status: submission_status,
    created_at: Date
}
export type new_project = Omit<projects, 'id'>