import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "../components/ui/button";

const Signup = () => {
  return (
    <div>
      <SignedOut>
        {/* <p>User isn't signed in</p> */}
        <SignInButton>
          <Button>Signin</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default Signup;
