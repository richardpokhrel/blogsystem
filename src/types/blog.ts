export interface BlogPost {
    id: string;
    title: string;
    content : string;
    images?: {
        id: number;
        url: string;
        name: string;
    }[];
    CreatedAt : string; 

};

export interface Comment {
    id: string;
    blogId: string;
    text: string;
    rating: number;
    createdAt: string;

}