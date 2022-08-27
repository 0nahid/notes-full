import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

export default function Login() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  return (
    <div>
      <button
        onClick={() => signInWithGoogle()}
      >Login</button>
    </div>
  )
}
