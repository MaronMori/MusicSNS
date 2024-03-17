import { useSetting_user_profile_context } from "@/app/contexts/setting_user_profile_context";

export const Form_user_pic = () => {
  const { setImage } = useSetting_user_profile_context();

  return (
    <div className="flex justify-around mb-8">
      <label className="ml-2">Profile Picture</label>
      <div style={{ transform: `translateX(60px)` }}>
        <input
          className=""
          type={"file"}
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
    </div>
  );
};
