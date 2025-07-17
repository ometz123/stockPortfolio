import { useNavigate } from 'react-router-dom';
import { ROUTES } from './Routes';

export default function NotFoundScreen() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate(ROUTES.WATCHLIST);
  };

  return (
    <>
      <div>
        <div>
          <div>
            <h1>Page not found</h1>
            <button className="btn btn-primary" onClick={goHome}>
              Go to homepage
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
