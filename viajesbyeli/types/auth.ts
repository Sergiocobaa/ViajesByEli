
export type User = {
    email: string;
    role: 'admin';
};


export type AuthContextType = {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    createOffer: (data: any) => Promise<any>; 
};