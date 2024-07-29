import { useUser } from "./userContext";

export default function Login() {
  const { user } = useUser();
  console.log(user);
  if (!user) return <div>No user foudn</div>;

  return <div>{user?.name}</div>;
}
