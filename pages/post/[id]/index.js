import axios from 'axios';

function Post({ post }) {
  console.log('Pre-rendered');
  return (
    <div>
      <h1>
        #:{post.id} - {post.title}
      </h1>
      <p>{post.body}</p>
    </div>
  );
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
  const posts = res.data;

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => `/post/${post.id}`);

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const post = res.data;
  return {
    props: { post }, // will be passed to the page component as props
  };
}

export default Post;
