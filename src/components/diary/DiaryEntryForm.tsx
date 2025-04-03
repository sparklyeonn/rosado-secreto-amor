
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CalendarIcon, SaveIcon, TrashIcon, ArrowLeftIcon } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  createdAt: string;
}

const DiaryEntryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [entry, setEntry] = useState<DiaryEntry>({
    id: id || crypto.randomUUID(),
    title: '',
    content: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    createdAt: new Date().toISOString(),
  });
  const [date, setDate] = useState<Date>(new Date());
  
  useEffect(() => {
    if (id) {
      const userEmail = localStorage.getItem('currentDiaryUser');
      const entriesKey = `diaryEntries_${userEmail}`;
      const entries = JSON.parse(localStorage.getItem(entriesKey) || '[]') as DiaryEntry[];
      const existingEntry = entries.find(e => e.id === id);
      
      if (existingEntry) {
        setEntry(existingEntry);
        setDate(new Date(existingEntry.date));
      }
    }
  }, [id]);
  
  const handleSave = () => {
    if (!entry.title.trim()) {
      toast({
        variant: "destructive",
        title: "Error al guardar",
        description: "Por favor añade un título a tu entrada.",
      });
      return;
    }
    
    const userEmail = localStorage.getItem('currentDiaryUser');
    const entriesKey = `diaryEntries_${userEmail}`;
    const entries = JSON.parse(localStorage.getItem(entriesKey) || '[]') as DiaryEntry[];
    
    const updatedEntry = {
      ...entry,
      date: format(date, 'yyyy-MM-dd'),
    };
    
    let updatedEntries: DiaryEntry[];
    
    if (id) {
      updatedEntries = entries.map(e => e.id === id ? updatedEntry : e);
    } else {
      updatedEntries = [updatedEntry, ...entries];
    }
    
    localStorage.setItem(entriesKey, JSON.stringify(updatedEntries));
    
    toast({
      title: "Entrada guardada",
      description: "Tu entrada de diario ha sido guardada con éxito.",
    });
    
    navigate('/diary');
  };
  
  const handleDelete = () => {
    if (!id) return;
    
    const userEmail = localStorage.getItem('currentDiaryUser');
    const entriesKey = `diaryEntries_${userEmail}`;
    const entries = JSON.parse(localStorage.getItem(entriesKey) || '[]') as DiaryEntry[];
    const updatedEntries = entries.filter(e => e.id !== id);
    
    localStorage.setItem(entriesKey, JSON.stringify(updatedEntries));
    
    toast({
      title: "Entrada eliminada",
      description: "Tu entrada de diario ha sido eliminada.",
    });
    
    navigate('/diary');
  };
  
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setDate(date);
    }
  };

  return (
    <Card className="diary-cover mx-auto max-w-3xl mb-8">
      <CardHeader className="flex flex-row items-center pb-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mr-2"
          onClick={() => navigate('/diary')}
        >
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>
        
        <div className="w-full">
          <Input
            value={entry.title}
            onChange={(e) => setEntry({ ...entry, title: e.target.value })}
            placeholder="Título de tu entrada..."
            className="text-xl font-medium bg-white bg-opacity-50 border-none focus-visible:ring-diary-300"
          />
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="ml-2">
              <CalendarIcon className="h-4 w-4 mr-2" />
              {format(date, 'dd MMM yyyy', { locale: es })}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              initialFocus
              className="p-3 pointer-events-auto rounded diary-cover"
            />
          </PopoverContent>
        </Popover>
      </CardHeader>
      
      <CardContent>
        <div className="mt-2">
          <Textarea
            value={entry.content}
            onChange={(e) => setEntry({ ...entry, content: e.target.value })}
            placeholder="Querido diario..."
            className="min-h-[300px] diary-paper resize-none focus-visible:ring-diary-300"
          />
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        {id && (
          <Button 
            variant="outline" 
            className="text-destructive hover:bg-destructive/10"
            onClick={handleDelete}
          >
            <TrashIcon className="h-4 w-4 mr-2" />
            Eliminar
          </Button>
        )}
        
        <div className="ml-auto">
          <Button onClick={handleSave} className="bg-diary-500 hover:bg-diary-600">
            <SaveIcon className="h-4 w-4 mr-2" />
            Guardar
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DiaryEntryForm;
