import CustomCalendar from '../customCalendar/customCalendar';
import './hola.css';

const CreateWorkDays = () => {


  return (
    <div>
      <CustomCalendar showDays={5} boolean={false}/>
      
    </div>
  );
};

export default CreateWorkDays;
