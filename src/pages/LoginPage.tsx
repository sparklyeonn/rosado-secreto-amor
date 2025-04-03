
import AuthForm from '@/components/auth/AuthForm';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4">
        <AuthForm />
      </main>
      <footer className="py-4 text-center text-diary-400 text-sm">
        <p>Secret Diary &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default LoginPage;
