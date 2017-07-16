import { Blogpost } from '../models/blogpost';

export const POSTS: Blogpost[] = [
    {
        id: "PPBqWA9",
        title: "FIRST POST",
        content: "<p>Content</p>",
        created: Date(),
        lastUpdated: Date(),
        tags: ['first']
    } as Blogpost,
    {
        id: "AGo3WC2",
        title: "Second Post",
        content: "<p>Different content</p>",
        created: Date(),
        lastUpdated: Date(),
        tags: ['second']
    }
];