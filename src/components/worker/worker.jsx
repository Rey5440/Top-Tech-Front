import { useEffect, useState } from "react";
import CreateWorkDays from "../createWorkDays/createWorkDays";
import NotFound from "../page_not_found/not_found";

const Worker = ({ user }) => {
  const [isWorker, setIsWorker] = useState(false);

  useEffect(() => {
    if (user.worker) {
      setIsWorker(true);
    }
  }, [user]);

  return (
    <div>
      {isWorker === true && isWorker ? (
        <div>
          <h1>Administracion del worker</h1>

          <CreateWorkDays />
          <hr />
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Worker;
