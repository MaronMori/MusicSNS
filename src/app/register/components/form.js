import {Form_email} from "@/app/components/tools/form_email";
import {Form_password} from "@/app/components/tools/form_password";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import {useEmailPass} from "@/app/contexts/email_pass_context";
import {Submit_button_to_form} from "@/app/components/tools/submit_button_to_form";
import {useRouter} from "next/navigation";
import {Button} from "@mui/material";

export const RegisterForm = () => {
    const {email, password} = useEmailPass();
    const router = useRouter();

    const doRegister = (e) => {
        e.preventDefault()
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // login automatically and get user info when registering completed
                const user = userCredential.user;
                alert("Success Log In!");
                console.log( user );
                router.push("/setting_user_profile")
            })
            .catch((error) => {
                console.log(error);
                alert(error.message);
            })
    }

    const goToLoginPage = () => {
        router.push("/login")
    }
    return(
        <div>
            <div className="mt-52 flex justify-center items-center text-center">
                <form className="w-full max-w-md border border-black p-4" onSubmit={doRegister}>
                    <h1 className="mb-6 text-2xl">Create Account</h1>
                    <Form_email />
                    <Form_password />
                    <Submit_button_to_form text={"Register"} />
                </form>
            </div>
            <div className={"text-center"}>
                <p className={"my-2"}>You have an account already? Then, Please go to Login Page.</p>
                <Button variant="contained" onClick={goToLoginPage}>Login</Button>
            </div>
        </div>

    )
}