import {Form_email} from "@/app/login/components/form_email";
import {Form_password} from "@/app/login/components/form_password";
import {Sign_in_button} from "@/app/login/components/sign_in_button";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {useEmailPass} from "@/app/login/contexts/email_pass_context";


export const LoginForm = () => {
    const {email, password} = useEmailPass;
    const doLogin = (e) => {
        e.preventDefault();

        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // if login is succeeded, alert ok
                alert("Success Log In!");
                console.log( user );
            })
            .catch((error) => {
                console.log(error);
                alert(error.message);
            });
    }
    return (
        <div className="min-h-screen flex justify-center items-center text-center">
            <form className="w-full max-w-md border border-black p-4" onSubmit={doLogin}>
                <h1 className="mb-6 text-2xl">Login</h1>
                <Form_email />
                <Form_password />
                <Sign_in_button />
            </form>
        </div>

    )
}