import { useEffect, useState } from 'react';
import axios from 'axios';
import formatHour from '../../functions/formatHour';
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const PublicAttention = () => {
    const [schedule, setSchedule] = useState({});
    const dias = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];
    const [showEdit, setShowEdit] = useState(false);
    const timeArray = [
        0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450,
        480, 510, 540, 570, 600, 630, 660, 690, 720, 750, 780, 810, 840, 870, 900,
        930, 960, 990, 1020, 1050, 1080, 1110, 1140, 1170, 1200, 1230, 1260, 1290,
        1320, 1350, 1380, 1410, 1440
    ];
    const [ timeEdit, setTimeEdit ] = useState({})
    const [ refresh, setRefresh ] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${VITE_BACKEND_URL}/schedule/`);
                const { data } = response;
                setSchedule(data.businessSchedule);
                setTimeEdit(data.businessSchedule)
            } catch (error) {
                console.error("Error al obtener los horarios", error);
                alert("Error al obtener los horarios");
            }
        };
        fetchData();
    }, [refresh]);

    const handleEdit = () => {
        setShowEdit(true);
    }
    const handleCancel = () => {
        setShowEdit(false);
        setTimeEdit(schedule)
    }
    const handleSubmit = async () => {
        try {
            const response = await axios.put(`${VITE_BACKEND_URL}/schedule/update`, {newSchedule: timeEdit});
            setRefresh(!refresh);
        } catch (error) {
            console.error("Error al obtener los horarios", error);
            alert("Error al obtener los horarios");
        }
        setShowEdit(false);
    }
    const handleSelectChange = (event, index, type) => {
        const value = event.target.value;
        setTimeEdit(prevState => ({
            ...prevState,
            [index]: {
                ...prevState[index],
                [type]: value
            }
        }));
    }

    return (
        <div>
            {showEdit === false && schedule && Object.keys(schedule).length > 0 && dias.map((day, index) => (
                <div key={index}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: "green" }}>
                        <h3>{day}</h3>
                        {schedule[index] && (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <h3 style={{ marginRight: '10px' }}>{formatHour(schedule[index].open)}</h3>
                                <h3>{formatHour(schedule[index].close)}</h3>
                            </div>
                        )}
                    </div>
                </div>
            ))}
            {showEdit === true && schedule && Object.keys(schedule).length > 0 && dias.map((day, index) => (
                <div key={index}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: "yellow" }}>
                        <h3>{day}</h3>
                        {schedule[index] && (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <select value={timeEdit[index]?.open} onChange={(event) => handleSelectChange(event, index, 'open')}>
                                    {timeArray.map((minute, index) => (
                                        <option key={index} value={minute}>{formatHour(minute)}</option>
                                    ))}
                                </select>
                                <select value={timeEdit[index]?.close} onChange={(event) => handleSelectChange(event, index, 'close')}>
                                    {timeArray.map((minute, index) => (
                                        <option key={index + 100} value={minute}>{formatHour(minute)}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                </div>
            ))}
            {showEdit === false && <button onClick={handleEdit}>Editar horarios</button>}
            {showEdit === true && <button onClick={handleCancel}>Cancelar</button>}
            {showEdit === true && <button onClick={handleSubmit}>Guardar cambios</button>}
        </div>
    );
};

export default PublicAttention;
