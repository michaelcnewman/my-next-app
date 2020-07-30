import axios from 'axios';
import Link from 'next/link';

function Index({ posts }) {
  return (
    <div>
      <h1>Our Index Page</h1>
      <ul>
        {posts.map((post, idx) => (
          <li key={idx}>
            <Link href={`/post/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps(context) {
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
  const posts = res.data;
  console.log('Fetching Data');
  return {
    props: { posts }, // will be passed to the page component as props
  };
}

export default Index;
