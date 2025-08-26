import { useApp } from 'components/AppContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from 'services/userService';

const Register = () => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [firstName, setFirstname] = useState('');
  const [lastName, setLasname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, isLoading } = useApp();
  
    useEffect(() => {
      if (!isLoading && user) {
        navigate('/settings');
      }
    }, [user, isLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        await registerUser({
          userName,
          email,
          firstName,
          lastName,
          password
        });

        navigate('/login');
    } catch (err) {
        setError((err as Error).message);
    }

  };

  
  if (isLoading || user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Create new account</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
                <div className="mb-4">
          <label className="block mb-1">
            Username <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
                <div className="mb-4">
          <label className="block mb-1">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={firstName}
            onChange={e => setFirstname(e.target.value)}
            required
          />
        </div>
                <div className="mb-4">
          <label className="block mb-1">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={lastName}
            onChange={e => setLasname(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Submit</button>
      </form>
    </div>
  );
};

export default Register;
