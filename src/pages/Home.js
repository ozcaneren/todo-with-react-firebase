import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logout, emailVerification } from '../firebase';
import { logout as logoutHandle } from '../store/auth';
import { useDispatch } from 'react-redux';
import { useNavigate} from "react-router-dom";
import UpdateProfile from "../component/updateProfile";

export default function Home() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const handleLogout = async () => {
    await logout();
    dispatch(logoutHandle());
    navigate("/", {
      replace: true
    });
  }
  const handleVerification = async () => {
    await emailVerification();
  }

  if (user) {
    return (
      <div className='max-w-xl mx-auto py-4'>
        <h1 className='flex gap-x-6'>
          {user.photoURL && <img src={user.photoURL} className='w-9 h-9 rounded-full' alt=''/>}
          Gardas oturumun acik {user.email}
          <button onClick={handleLogout} className='h-10 rounded px-4 text-sm text-white bg-indigo-500'>buyur cik gardas</button>
          {!user.emailVerified && <button onClick={handleVerification} className='h-10 rounded px-4 text-sm text-white bg-indigo-500'>Verificate Email</button>}
        </h1>
        <UpdateProfile />
      </div>
    )
  }

  return (
    <div>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </div>
  )
}