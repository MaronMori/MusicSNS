import { useSetting_user_profile_context } from "@/app/components/provider/setting_user_profile_context";

export const Form_user_bio = () => {
  const { setBio } = useSetting_user_profile_context();

  return (
    <div className="flex justify-around items-center mb-8">
      <label className="mr-0.5">Profile</label>
      <textarea
        className="mx-4 h-24 border border-black rounded"
        onChange={(e) => setBio(e.target.value)}
      />
    </div>
  );
};
