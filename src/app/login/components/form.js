import {Form_email} from "@/app/components/tools/form_email";
import {Form_password} from "@/app/components/tools/form_password";
import {Submit_button_to_form} from "@/app/components/tools/submit_button_to_form";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {useEmailPass} from "@/app/contexts/email_pass_context";
import {useRouter} from "next/navigation";

export const LoginForm = () => {
    const {email, password} = useEmailPass();
    const router = useRouter()
    const doLogin = (e) => {
        e.preventDefault();

        const auth = getAuth();
        console.log(auth)

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // if login is succeeded, alert ok
                alert("Success Log In!");
                console.log( user );
                router.push("/")
            })
            .catch((error) => {
                console.log(error);
                alert(error.message);
            });
    }
    return (
        <div className={"h-screen mx-2"}>
            <div className="pt-32 flex justify-center text-center">
                <form className="w-full max-w-md border border-black p-4" onSubmit={doLogin}>
                    <h1 className="mb-6 text-2xl">Login</h1>
                    <Form_email />
                    <Form_password />
                    <Submit_button_to_form text={"Login"}/>
                </form>
            </div>
            <div className={"mt-4 text-center"}>
                <p>Test account/仮アカウント</p>
                <div className={"flex justify-center"}>
                    <div className={"border border-black mt-2 p-4"}>
                        <p>Email: q80jdo8rc9@sute.jp</p>
                        <p>Password: password123</p>
                    </div>
                </div>
            </div>
        </div>

    )
}