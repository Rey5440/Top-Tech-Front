
const SelectedDay = ({ firstMonth, firstDay, days }) => {

    return (
        <div>
            <h2>esto es selectedDay</h2>
            {days[firstMonth][firstDay] ?  <h2>existe</h2> : <h2>no existe</h2>}
        </div>
    )
}

export default SelectedDay;