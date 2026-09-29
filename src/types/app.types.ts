export type user_role = 'Submiter' | 'Reviewer'

export interface Users {
    id: number,
    name: string,
    email: string,
    password: string,
    role: user_role 
}

export type new_user = Omit<Users, 'id'>

export type submission_status = 'Pending' | 'Rejected' | 'Approved' | 'in_review'

export interface projects {
    id: number,
    name: string,
    description: string,
    userId: number[],
    project_status: submission_status,

    

}