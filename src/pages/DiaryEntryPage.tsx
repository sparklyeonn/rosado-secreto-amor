
import DiaryHeader from '@/components/diary/DiaryHeader';
import DiaryEntryForm from '@/components/diary/DiaryEntryForm';
import AuthGuard from '@/components/auth/AuthGuard';

const DiaryEntryPage = () => {
  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col bg-diary-pattern">
        <DiaryHeader />
        <main className="flex-1 py-8 px-4">
          <DiaryEntryForm />
        </main>
        <footer className="py-4 text-center text-diary-400 text-sm">
          <p>Mi Diario Secreto &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </AuthGuard>
  );
};

export default DiaryEntryPage;
