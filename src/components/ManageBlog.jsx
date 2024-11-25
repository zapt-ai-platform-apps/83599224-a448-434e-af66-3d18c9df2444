import { createSignal, onMount, For } from 'solid-js';
import { supabase } from '../supabaseClient';

function ManageBlog() {
  const [posts, setPosts] = createSignal([]);
  const [newPost, setNewPost] = createSignal({ title: '', content: '' });
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

  const createPost = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/createPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost())
      });
      if (response.ok) {
        setNewPost({ title: '', content: '' });
        fetchPosts();
      } else {
        console.error('Error creating post:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    if (!confirm('هل أنت متأكد من حذف هذا المقال؟')) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/deletePost?id=${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchPosts();
      } else {
        console.error('Error deleting post:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    } finally {
      setLoading(false);
    }
  };

  onMount(() => {
    fetchPosts();
  });

  return (
    <div>
      <h2 class="text-2xl font-bold mb-4 text-blue-600">إدارة المدونة</h2>
      <div class="mb-6">
        <h3 class="text-xl font-semibold mb-2">إضافة مقال جديد</h3>
        <div class="bg-white p-4 rounded-lg shadow-md mb-4">
          <div class="mb-2">
            <label class="block text-gray-700 mb-1">العنوان</label>
            <input
              type="text"
              value={newPost().title}
              onInput={(e) => setNewPost({ ...newPost(), title: e.target.value })}
              class="w-full p-2 border border-gray-300 rounded box-border"
            />
          </div>
          <div class="mb-2">
            <label class="block text-gray-700 mb-1">المحتوى</label>
            <textarea
              value={newPost().content}
              onInput={(e) => setNewPost({ ...newPost(), content: e.target.value })}
              class="w-full p-2 border border-gray-300 rounded box-border"
            ></textarea>
          </div>
          <button
            onClick={createPost}
            disabled={loading()}
            class={`bg-green-600 text-white px-4 py-2 rounded ${loading() ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {loading() ? 'جارٍ النشر...' : 'نشر'}
          </button>
        </div>
      </div>
      <h3 class="text-xl font-semibold mb-2">جميع المقالات</h3>
      <div class="space-y-4">
        <For each={posts()}>
          {(post) => (
            <div class="bg-white p-4 rounded-lg shadow-md">
              <h4 class="text-lg font-bold mb-1">{post.title}</h4>
              <p class="text-gray-700 mb-2">{post.content}</p>
              <button
                onClick={() => deletePost(post.id)}
                class="bg-red-600 text-white px-4 py-1 rounded cursor-pointer"
              >
                حذف
              </button>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}

export default ManageBlog;