
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockIcon, MailIcon, LogInIcon, UserPlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

interface User {
  email: string;
  password: string;
}

const AuthForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ email: '', password: '', confirmPassword: '' });

  // Mock authentication logic (would connect to a backend in a real app)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock login logic
    setTimeout(() => {
      // In a real app, this would validate against a backend
      const storedUsers = JSON.parse(localStorage.getItem('diaryUsers') || '[]') as User[];
      const user = storedUsers.find(
        (u) => u.email === loginData.email && u.password === loginData.password
      );

      if (user) {
        localStorage.setItem('currentDiaryUser', loginData.email);
        toast({
          title: "¡Bienvenido de nuevo!",
          description: "Accediendo a tu diario secreto...",
        });
        navigate('/diary');
      } else {
        toast({
          variant: "destructive",
          title: "Error de acceso",
          description: "Email o contraseña incorrectos.",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (registerData.password !== registerData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error de registro",
        description: "Las contraseñas no coinciden.",
      });
      setIsLoading(false);
      return;
    }

    // Mock registration logic
    setTimeout(() => {
      // In a real app, this would save to a backend
      const storedUsers = JSON.parse(localStorage.getItem('diaryUsers') || '[]') as User[];
      
      if (storedUsers.some(user => user.email === registerData.email)) {
        toast({
          variant: "destructive",
          title: "Error de registro",
          description: "Este email ya está registrado.",
        });
      } else {
        const newUsers = [...storedUsers, { email: registerData.email, password: registerData.password }];
        localStorage.setItem('diaryUsers', JSON.stringify(newUsers));
        localStorage.setItem('currentDiaryUser', registerData.email);
        
        toast({
          title: "¡Registro exitoso!",
          description: "Tu diario secreto ha sido creado.",
        });
        navigate('/diary');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] animate-fade-in">
      <Card className="w-full max-w-md shadow-xl diary-cover border-2">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold text-diary-700">Mi Diario Secreto</CardTitle>
          <CardDescription className="text-diary-600">
            Tu espacio personal para guardar tus pensamientos
          </CardDescription>
        </CardHeader>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" className="data-[state=active]:bg-diary-100 data-[state=active]:text-diary-700">
              <LogInIcon className="w-4 h-4 mr-2" /> Acceder
            </TabsTrigger>
            <TabsTrigger value="register" className="data-[state=active]:bg-diary-100 data-[state=active]:text-diary-700">
              <UserPlusIcon className="w-4 h-4 mr-2" /> Registrar
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-3 h-4 w-4 text-diary-400" />
                    <Input
                      type="email"
                      placeholder="Email"
                      className="pl-10 bg-white bg-opacity-80"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="relative">
                    <LockIcon className="absolute left-3 top-3 h-4 w-4 text-diary-400" />
                    <Input
                      type="password"
                      placeholder="Contraseña"
                      className="pl-10 bg-white bg-opacity-80"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-diary-500 hover:bg-diary-600"
                  disabled={isLoading}
                >
                  {isLoading ? 'Accediendo...' : 'Acceder al Diario'}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegister}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-3 h-4 w-4 text-diary-400" />
                    <Input
                      type="email"
                      placeholder="Email"
                      className="pl-10 bg-white bg-opacity-80"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="relative">
                    <LockIcon className="absolute left-3 top-3 h-4 w-4 text-diary-400" />
                    <Input
                      type="password"
                      placeholder="Contraseña"
                      className="pl-10 bg-white bg-opacity-80"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="relative">
                    <LockIcon className="absolute left-3 top-3 h-4 w-4 text-diary-400" />
                    <Input
                      type="password"
                      placeholder="Confirmar Contraseña"
                      className="pl-10 bg-white bg-opacity-80"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-diary-500 hover:bg-diary-600"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creando cuenta...' : 'Crear Mi Diario'}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default AuthForm;
