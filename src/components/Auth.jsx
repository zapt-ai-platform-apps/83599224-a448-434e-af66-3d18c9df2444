import { supabase } from '../supabaseClient';
import { Auth } from '@supabase/auth-ui-solid';
import { ThemeSupa } from '@supabase/auth-ui-shared';

function Auth() {
  return (
    <div class="flex items-center justify-center min-h-screen">
      <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 class="text-3xl font-bold mb-6 text-center text-blue-600">تسجيل الدخول باستخدام ZAPT</h2>
        <a
          href="https://www.zapt.ai"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-500 hover:underline mb-6 block text-center"
        >
          تعلم المزيد عن ZAPT
        </a>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google', 'facebook', 'apple']}
          magicLink={true}
          view="magic_link"
          showLinks={false}
        />
      </div>
    </div>
  );
}

export default Auth;