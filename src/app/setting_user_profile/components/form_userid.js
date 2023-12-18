import {useSetting_user_profile_context} from "@/app/contexts/setting_user_profile_context";

export const Form_userid = () => {
    const {setUserID} = useSetting_user_profile_context()

    return (
        <div className="flex justify-around items-center mb-8">
            <label className="mx-4">User ID</label>
            <input className="mx-4 border border-black rounded"  onChange={(e) => setUserID(e.target.value)}/>
        </div>
    )
}