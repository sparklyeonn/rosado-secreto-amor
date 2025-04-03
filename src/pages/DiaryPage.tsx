
import DiaryHeader from '@/components/diary/DiaryHeader';
import DiaryEntryList from '@/components/diary/DiaryEntryList';
import AuthGuard from '@/components/auth/AuthGuard';

const DiaryPage = () => {
  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col bg-diary-pattern">
        <DiaryHeader />
        <main className="flex-1 py-8">
          <DiaryEntryList />
        </main>
        <footer className="py-4 text-center text-diary-400 text-sm">
          <p>Secret Diary &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </AuthGuard>
  );
};

export default DiaryPage;
