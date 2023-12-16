import {Form_email} from "@/app/components/form_email";
import {Form_password} from "@/app/components/form_password";
import {Register_button} from "@/app/register/components/register_button";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import {useEmailPass} from "@/app/contexts/email_pass_context";

export const RegisterForm = () => {
    const {email, password} = useEmailPass();

    const doRegister = (e) => {
        e.preventDefault()
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // login automatically and get user info when registering completed
                const user = userCredential.user;
                alert("Success Log In!");
                console.log( user );
            })
            .catch((error) => {
                console.log(error);
                alert(error.message);
            })
    }
    return(
        <div className="min-h-screen flex justify-center items-center text-center">
            <form className="w-full max-w-md border border-black p-4" onSubmit={doRegister}>
                <h1 className="mb-6 text-2xl">Create Account</h1>
                <Form_email />
                <Form_password />
                <Register_button />
            </form>
        </div>
    )
}