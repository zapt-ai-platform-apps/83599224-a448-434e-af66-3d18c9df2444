import { useNavigate } from '@solidjs/router';
import ManageBlog from './ManageBlog';

function AdminPanel(props) {
  const navigate = useNavigate();

  if (props.user()?.email !== 'daoudi.abdennour@gmail.com') {
    navigate('/');
    return null;
  }

  return (
    <div class="mt-8">
      <h1 class="text-3xl font-bold text-blue-600 mb-4">لوحة التحكم</h1>
      <ManageBlog />
    </div>
  );
}

export default AdminPanel;