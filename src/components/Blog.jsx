import { createSignal, onMount, For } from 'solid-js';

function Blog() {
  const [posts, setPosts] = createSignal([]);
  const [loading, setLoading] = createSignal(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/getPosts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.error('Error fetching posts:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  onMount(() => {
    fetchPosts();
  });

  return (
    <div class="mt-8">
      <h1 class="text-3xl font-bold text-blue-600 mb-4 text-center">المدونة</h1>
      <div class="space-y-4">
        <For each={posts()}>
          {(post) => (
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h2 class="text-2xl font-bold mb-2">{post.title}</h2>
              <p class="text-gray-700">{post.content}</p>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}

export default Blog;