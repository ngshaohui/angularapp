import { Blogpost } from '../models/blogpost';

export const COMPLETED_POSTS: Blogpost[] = [
    {
        id: "PPBqWA9",
        title: "FIRST POST",
        content: '<p style="font-weight: bold">Content</p>',
        created: Date(),
        lastUpdated: Date(),
        tags: ['first']
    } as Blogpost,
    {
        id: "AGo3WC2",
        title: "Second Post",
        content: '<p>A horse, a horse!</p><p>My <span style="color: rgb(230, 0, 0);">kingdom</span> for a horse!</p>',
        created: Date(),
        lastUpdated: Date(),
        tags: ['second']
    },
    {
        id: "CmT8L0A",
        title: "Third Post",
        content: '<p>&lt;script&gt;alert("Hello");&lt;/script&gt;</p><p><span style="color: rgb(230, 0, 0);">security</span> testing</p>',
        created: Date(),
        lastUpdated: Date(),
        tags: ['third', 'security', 'xss']
    },
    {
        id: "Q1W82C4",
        title: "Fourth Post",
        content: 'Template <script>alert("0wned")</script> <b>Syntax</b>',
        created: Date(),
        lastUpdated: Date(),
        tags: ['fourth', 'security', 'xss']
    }
];