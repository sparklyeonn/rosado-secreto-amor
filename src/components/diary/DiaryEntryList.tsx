
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon, CalendarIcon, FileTextIcon } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  createdAt: string;
}

const DiaryEntryList = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  
  useEffect(() => {
    const userEmail = localStorage.getItem('currentDiaryUser');
    const entriesKey = `diaryEntries_${userEmail}`;
    const storedEntries = JSON.parse(localStorage.getItem(entriesKey) || '[]') as DiaryEntry[];
    setEntries(storedEntries);
  }, []);
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd MMMM yyyy', { locale: es });
  };
  
  const getExcerpt = (content: string, maxLength = 120) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="container mx-auto px-4 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-diary-700">Mis Entradas</h2>
        <Button 
          onClick={() => navigate('/diary/new')}
          className="bg-diary-500 hover:bg-diary-600"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Nueva Entrada
        </Button>
      </div>
      
      {entries.length === 0 ? (
        <Card className="diary-cover text-center py-16">
          <CardContent>
            <div className="flex flex-col items-center">
              <FileTextIcon className="h-16 w-16 text-diary-300 mb-4" />
              <h3 className="text-xl font-medium text-diary-700 mb-2">No hay entradas aún</h3>
              <p className="text-diary-600 mb-6 max-w-md mx-auto">
                Comienza a escribir tu primera entrada en tu diario secreto.
              </p>
              <Button 
                onClick={() => navigate('/diary/new')}
                className="bg-diary-500 hover:bg-diary-600"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Crear Primera Entrada
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry) => (
            <Card 
              key={entry.id} 
              className="diary-cover relative overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/diary/edit/${entry.id}`)}
            >
              <div className="diary-ribbon">
                {format(new Date(entry.date), 'MMM', { locale: es })}
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="line-clamp-1">{entry.title}</CardTitle>
                <CardDescription className="flex items-center text-diary-600">
                  <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                  {formatDate(entry.date)}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-diary-700 line-clamp-3">{getExcerpt(entry.content)}</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-diary-500 hover:text-diary-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/diary/edit/${entry.id}`);
                  }}
                >
                  Leer más
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiaryEntryList;
