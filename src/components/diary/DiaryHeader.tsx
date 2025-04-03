
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOutIcon, CalendarIcon, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const DiaryHeader = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('currentDiaryUser') || '');

  const handleLogout = () => {
    localStorage.removeItem('currentDiaryUser');
    toast({
      title: "Sesión cerrada",
      description: "Has salido de tu diario secreto.",
    });
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-diary-200 bg-white bg-opacity-80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="hidden sm:block text-2xl font-bold text-diary-700">
            Secret Diary
          </h1>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-diary-700">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="diary-cover border-r-0">
                <div className="flex flex-col h-full">
                  <h2 className="text-2xl font-bold text-diary-700 mb-6">
                    Secret Diary
                  </h2>
                  <nav className="flex flex-col gap-4">
                    <SheetClose asChild>
                      <Button 
                        variant="ghost" 
                        className="justify-start text-diary-700 hover:bg-diary-100 hover:text-diary-800"
                        onClick={() => navigate('/diary')}
                      >
                        <CalendarIcon className="mr-2 h-5 w-5" />
                        Entradas del Diario
                      </Button>
                    </SheetClose>
                    
                    <Button 
                      variant="ghost" 
                      className="justify-start text-diary-700 hover:bg-diary-100 hover:text-diary-800"
                      onClick={handleLogout}
                    >
                      <LogOutIcon className="mr-2 h-5 w-5" />
                      Cerrar Sesión
                    </Button>
                  </nav>
                  <div className="mt-auto pt-4 border-t border-diary-200">
                    <p className="text-sm text-diary-600">
                      {userEmail}
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Button 
            variant="ghost" 
            className="text-diary-700 hover:bg-diary-100 hover:text-diary-800"
            onClick={() => navigate('/diary')}
          >
            <CalendarIcon className="mr-2 h-5 w-5" />
            Entradas del Diario
          </Button>
        </nav>
        
        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-sm text-diary-600">
            {userEmail}
          </span>
          <Button 
            variant="outline" 
            className="text-diary-700 border-diary-300 hover:bg-diary-100 hover:text-diary-800"
            onClick={handleLogout}
          >
            <LogOutIcon className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Cerrar Sesión</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DiaryHeader;
