
export interface User {
    username: string,
    password: string,
    id?: number,
    favoritePosts: number[],
    moderator: boolean,
}