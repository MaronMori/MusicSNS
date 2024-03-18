import { Card, CardContent, Typography } from "@mui/material";

export const Tentative_account = () => {
  return (
    <div className={"text-center"}>
      <Typography variant={"caption"} display={"block"}>
        You can try to login by using this tentative account.
      </Typography>
      <Typography variant={"caption"}>
        新規ユーザー登録の代わりに下の仮アカウントでログインできます。
      </Typography>
      <div className={"flex justify-center"}>
        <Card variant={"outlined"}>
          <CardContent>
            <Typography variant={"h6"}>
              Tentative Account/仮アカウント
            </Typography>
            <Typography>Email: q80jdo8rc9@sute.jp</Typography>
            <Typography>Password: password123</Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
