import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Image,
    Button,
    Divider,
    Listbox,
    ListboxSection,
    ListboxItem,
    User,
    Tabs,
    Tab,
  } from "@nextui-org/react";

const LineaTiempo = () => {
    const [AllSnapshots, setAllSnapshots] = useState([]);
    const now = new Date();
    const startMonth = new Date(now.getFullYear(), now.getMonth() - 11, 1);
    const endMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const token = localStorage.getItem('token');
    const months = [];
    for (let d = startMonth; d <= endMonth; d.setMonth(d.getMonth() + 1)) {
        months.push(new Date(d));
    }

    useEffect(() => {
        const fetchData = async () => {
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.user_id;
            const resSnapshot = await axios.get(
                `http://localhost:8000/api/Snapshot/`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })

            const resTeam = await axios.get(
                `http://127.0.0.1:8000/api/equipos/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const FilterSnapshots = resSnapshot.data.filter(snapshot => snapshot.user === userId)
            setAllSnapshots(FilterSnapshots)
        };

        fetchData();
    }, []);

    const getColor = (status) => {
        switch (status) {
            case 'Completado':
                return 'green';
            case 'Pendiente':
                return 'blue';
            default:
                return 'gray';
        }
    };

return (
    <div className="timeline">
        <h2 className="text-center text-lg">Mis snapshots</h2>
        <Divider/>
        <div className="h-[350px] max-h-[350px]" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto', position: 'relative', border: '1px solid transparent' }}>
            {AllSnapshots.map((snapshot, i) => {
                const startDate = new Date(snapshot.startDate);
                const endDate = new Date(snapshot.endDate);
                const startMonthIndex = months.findIndex(month => month.getMonth() === startDate.getMonth() && month.getFullYear() === startDate.getFullYear());
                const endMonthIndex = months.findIndex(month => month.getMonth() === endDate.getMonth() && month.getFullYear() === endDate.getFullYear());
                const left = `${startMonthIndex / months.length * 50}%`;
                const width = `${(endMonthIndex - startMonthIndex + 1) / months.length * 100}%`;
                return (
                    <div key={i} style={{ position: 'relative', left, width, backgroundColor: getColor(snapshot.Estado), height: '10px', margin: '20px 0', borderRadius: '100%' }}>
                        <div style={{ position: 'absolute', left: '10%', width: '80%', backgroundColor: getColor(snapshot.Estado), height: '10px'}}></div>
                    </div>
                );
            })}
        </div>
        <Divider/>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            {months.map((month, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                    <p>{month.toLocaleString('default', { month: 'long' })}</p>
                    {now.getMonth() === month.getMonth() && now.getFullYear() === month.getFullYear() && (
                        <div style={{ color: 'red' }}>Hoy</div>
                    )}
                </div>
            ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'green', marginRight: '5px' }}></div>
                <p>Completado</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'blue', marginRight: '5px' }}></div>
                <p>Pendiente</p>
            </div>
        </div>
    </div>
);
};

export default LineaTiempo;
