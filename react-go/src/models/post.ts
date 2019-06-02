import { Comment } from "./comment";

export interface Post {
    id?: number,
    title: string,
    imageUrl: string,
    body: string,
    numOfFavorites: number,
    comments: Comment[],
    dateCreated: string,
    author: string,
    authorId: number,
}
