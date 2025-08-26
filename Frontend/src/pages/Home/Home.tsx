const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Welcome on AuthentificationBase</h1>
      <p className="text-lg text-gray-700 mb-8">Your secure access point for all your .NET & React projects.</p>
      <a href="/login" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">Login</a>
    </div>
  );
};

export default Home;
