import { Show } from 'solid-js';
import { A } from '@solidjs/router';
import { supabase } from '../supabaseClient';

function Header(props) {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header class="bg-white shadow">
      <div class="container mx-auto p-4 flex justify-between items-center">
        <A href="/" class="text-2xl font-bold text-blue-600">New App</A>
        <nav class="flex space-x-4 items-center">
          <A href="/blog" class="text-gray-700 hover:text-blue-600 cursor-pointer">المدونة</A>
          <Show when={props.user()} fallback={<A href="/auth" class="text-gray-700 hover:text-blue-600 cursor-pointer">تسجيل الدخول</A>}>
            <A href="/profile" class="text-gray-700 hover:text-blue-600 cursor-pointer">ملفي الشخصي</A>
            <Show when={props.user().email === 'daoudi.abdennour@gmail.com'}>
              <A href="/admin" class="text-gray-700 hover:text-blue-600 cursor-pointer">لوحة التحكم</A>
            </Show>
            <button onClick={handleSignOut} class="text-red-500 hover:text-red-600 cursor-pointer">تسجيل الخروج</button>
          </Show>
        </nav>
      </div>
    </header>
  );
}

export default Header;