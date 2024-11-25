import { createSignal, onMount } from 'solid-js';
import { supabase } from '../supabaseClient';

function Profile(props) {
  const [profile, setProfile] = createSignal({ username: '', bio: '' });
  const [loading, setLoading] = createSignal(false);
  const user = props.user();

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/getProfile', {
        headers: {
          'Authorization': `Bearer ${user.access_token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        console.error('Error fetching profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/updateProfile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profile())
      });
      if (response.ok) {
        alert('تم تحديث الملف الشخصي بنجاح');
      } else {
        console.error('Error updating profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  onMount(() => {
    fetchProfile();
  });

  return (
    <div class="max-w-md mx-auto mt-8">
      <h1 class="text-3xl font-bold text-blue-600 mb-4 text-center">ملفي الشخصي</h1>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">البريد الإلكتروني</label>
          <input type="text" value={user.email} disabled class="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">اسم المستخدم</label>
          <input
            type="text"
            value={profile().username}
            onInput={(e) => setProfile({ ...profile(), username: e.target.value })}
            class="w-full p-2 border border-gray-300 rounded box-border"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">نبذة عني</label>
          <textarea
            value={profile().bio}
            onInput={(e) => setProfile({ ...profile(), bio: e.target.value })}
            class="w-full p-2 border border-gray-300 rounded box-border"
          />
        </div>
        <button
          onClick={updateProfile}
          disabled={loading()}
          class={`bg-blue-600 text-white px-4 py-2 rounded ${loading() ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {loading() ? 'جارٍ التحديث...' : 'حفظ التغييرات'}
        </button>
      </div>
    </div>
  );
}

export default Profile;