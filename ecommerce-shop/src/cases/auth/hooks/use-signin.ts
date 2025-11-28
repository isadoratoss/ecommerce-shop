import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./use-auth";
import { AuthService } from "../services/auth.service";

export function useSignIn(){
    const {signIn} = useAuth()

    return useMutation({
        mutationFn: AuthService.signIn,
        onSuccess: (data) => signIn(data)
    })
}