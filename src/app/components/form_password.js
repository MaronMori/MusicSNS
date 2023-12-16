import {useEmailPass} from "@/app/contexts/email_pass_context";

export const Form_password = () => {
    const {setPassword} = useEmailPass();
    return (
        <div className="flex justify-between items-center mb-4">
            <label className="mx-4">
                Password
            </label>
            <input type="password" name="password" className="border border-black mx-4 rounded" onChange={(e)=> setPassword((e.target.value))}/>
        </div>
    )
}