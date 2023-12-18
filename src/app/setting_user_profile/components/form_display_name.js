import {useSetting_user_profile_context} from "@/app/contexts/setting_user_profile_context";

export const Form_display_name = () => {
    const {setUsername} = useSetting_user_profile_context()

    return (
        <div className="flex justify-around items-center mb-8">
            <label className="mr-1.5" >Name</label>
            <input  className="ml-0.5 border border-black rounded" onChange={(e)=> setUsername(e.target.value)}/>
        </div>
    )
}