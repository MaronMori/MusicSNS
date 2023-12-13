"use client"

import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";
// 現時点で使わないものもあるが今後のことを考えて入れておく
import { useState } from "react";

// import firebaseApp to initialize Firebase
import firebaseApp from "../../../lib/FirebaseConfig";

export default function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const doRegister = () => {
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
            })
    }
    return (
        <div className="text-center">
            <h1 className="p-5">Create Account</h1>
            <div>
                <form className="grid grid-rows-2 gap-6">
                    <div className="grid grid-cols-2 px-16">
                        <label>
                            Email Address:
                        </label>
                        <input type="email" name="email" className="border border-black" onChange={(e)=> setEmail((e.target.value))}/>
                    </div>
                    <div>
                        <label>
                            Password:
                        </label>
                        <input type="password" name="password" className="border border-black" onChange={(e)=> setEmail((e.target.value))}/>
                    </div>
                    <div>
                        <button onClick={() => {doRegister();}}>Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}