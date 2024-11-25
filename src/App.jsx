import { createSignal, createEffect } from 'solid-js';
import { Routes, Route, useNavigate } from '@solidjs/router';
import { supabase } from './supabaseClient';
import Auth from './components/Auth';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Profile from './components/Profile';
import AdminPanel from './components/AdminPanel';
import Blog from './components/Blog';

function App() {
  const [user, setUser] = createSignal(null);
  const navigate = useNavigate();

  const checkUserSignedIn = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
    } else {
      navigate('/auth');
    }
  };

  createEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
        navigate('/auth');
      }
    });

    return () => {
      authListener.data.unsubscribe();
    };
  });

  checkUserSignedIn();

  return (
    <div class="min-h-screen bg-gray-100">
      <Header user={user} />
      <main class="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/blog/*" element={<Blog user={user} />} />
          <Route path="/admin/*" element={<AdminPanel user={user} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;