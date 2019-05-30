export interface Post {
    id: number,
    title: string,
    imageUrl: string,
    body: string,
    numOfFavorties: number,
    comments: Comment[]
}

export interface Comment{
    username: string,
    body: string
}