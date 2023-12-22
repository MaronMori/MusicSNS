import {Form_email} from "@/app/components/tools/form_email";
import {Form_password} from "@/app/components/tools/form_password";
import {Submit_button_to_form} from "@/app/components/tools/submit_button_to_form";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {useEmailPass} from "@/app/contexts/email_pass_context";

export const LoginForm = () => {
    const {email, password} = useEmailPass();
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
                <Submit_button_to_form text={"Login"}/>
            </form>
        </div>

    )
}