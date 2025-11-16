import { AddBlog } from "../../components/dashboard/blog/addBlog/AddBlog";
import BlogLanding from "../../components/dashboard/blog/BlogLanding";
import BlogList from "../../components/dashboard/blog/blogList/BlogList";

export const blog = [
    {
        path: 'blog',
        element: <BlogLanding/>
    },
    {
        path: 'add_blog',
        element: <AddBlog/>
    },
    {
        path: 'blog_list',
        element: <BlogList/>
    },
]