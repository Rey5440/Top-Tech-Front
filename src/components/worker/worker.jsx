import CreateWorkDays from "../createWorkDays/createWorkDays";
import NotFound from "../page_not_found/not_found";

const Worker = ({ user }) => {
  return (
    <div>
      {user?.worker && (
        <div>
          <h1>Administracion del worker</h1>
          <CreateWorkDays user={user} />
        </div>
      )}
      {!user?.worker && <NotFound />}
    </div>
  );
};

export default Worker;
