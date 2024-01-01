import {
    useQuery,
    useMutation,
    useQueryClient,
    useIsFetching,
} from '@tanstack/react-query';
import { SignIN, createUserAccount } from '../appwrite/api';
import { INewUser } from '@/types';

export const useCreateUserAccountMutation = () => {
    return useMutation({
        mutationFn: (newUser: INewUser) => createUserAccount(newUser),
    })
};

export const useSignIN = () => {
    return useMutation({
        mutationFn: (user:{email:string, password:string}) => SignIN(user),
    })
}