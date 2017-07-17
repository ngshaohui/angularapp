import { Blogpost } from '../models/blogpost';

export const COMPLETED_POSTS: Blogpost[] = [
    {
        id: "PPBqWA9",
        title: "FIRST POST (Really long post)",
        content: `'<p>Lorem Ipsum is simply <strong>dummy</strong> text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard <strong>dummy</strong> text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only <s>four</s> five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing <span class="ql-size-large">Lorem Ipsum</span> passages, and more recently with desktop publishing software like <span style="color: rgb(230, 0, 0);">Aldus PageMaker</span> including versions of <span class="ql-size-large">Lorem Ipsum</span>.</p><p><br></p><p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p><p><br></p><p>Random list</p><ol><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Fourth</li></ol><p>Many desktop publishing packages and web page editors now use <span class="ql-size-huge">Lorem Ipsum</span> as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, <span class="ql-size-small">sometimes by</span> <span class="ql-size-small">accident</span>, sometimes on purpose (injected humour and the like).</p>'`,
        created: Date(),
        lastUpdated: Date(),
        tags: ['first', 'long', 'text']
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
    },
    {
        id: "O23ZJ1P",
        title: "Fifth Post (really long post)",
        content: `<p><strong>The standard Lorem Ipsum passage, used since the 1500s</strong></p><p><br></p><p><em>"Lorem ipsum dolor sit amet, consectetur adipiscing elit</em>, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <a href="google.com" target="_blank">Duis aute irure dolor in reprehenderit</a> in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p><p><br></p><p><strong>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</strong></p><p><br></p><p><span class="ql-size-huge">"Sed ut perspiciatis</span> <span class="ql-size-large">unde omnis iste natus error sit</span> voluptatem <span class="ql-size-small">accusantium</span> doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? <span style="background-color: rgb(230, 0, 0);">Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem</span> <span style="color: rgb(230, 0, 0);">eum fugiat quo voluptas nulla pariatur?"</span></p>`,
        created: Date(),
        lastUpdated: Date(),
        tags: ['fifth', 'long', 'text']
    },
];