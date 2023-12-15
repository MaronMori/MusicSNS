"use client"

import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";
// 現時点で使わないものもあるが今後のことを考えて入れておく
import { useState } from "react";

// import firebaseApp to initialize Firebase
import firebaseApp from "../../../lib/FirebaseConfig";

export default function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
    return (
        <div className="min-h-screen flex justify-center items-center text-center">
                <form className="w-full max-w-md border border-black p-4" onSubmit={doRegister}>
                    <h1 className="mb-6 text-2xl">Create Account</h1>
                    <div className="flex justify-between items-center mb-4">
                        <label className="mx-4">
                            Email Address
                        </label>
                        <input type="email" name="email" className="border border-black mx-4 rounded" onChange={(e)=> setEmail((e.target.value))}/>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <label className="mx-4">
                            Password
                        </label>
                        <input type="password" name="password" className="border border-black mx-4 rounded" onChange={(e)=> setPassword((e.target.value))}/>
                    </div>
                    <div>
                        <button className="border border-black px-2 py-1 rounded-2xl" type="submit">Create</button>
                    </div>
                </form>
        </div>
    )
}