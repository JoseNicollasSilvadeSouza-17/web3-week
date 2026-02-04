import { useConnection } from 'wagmi';
import Login from './Login';
import Vote from './Vote';

export default function App() {

  const connection = useConnection();

  return (
    <>
      {
        connection.status === "connected"
          ? <Vote />
          : <Login />
      }
    </>
  )
}