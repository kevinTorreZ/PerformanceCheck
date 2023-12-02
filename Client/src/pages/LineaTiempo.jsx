import React from 'react';

const LineaTiempo = () => {
    const now = new Date();
    const startMonth = new Date(now.getFullYear(), now.getMonth() - 11, 1);
    const endMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const months = [];
    for (let d = startMonth; d <= endMonth; d.setMonth(d.getMonth() + 1)) {
        months.push(new Date(d));
    }

    const snapshots = [
        { startDate: '2023-01-01', endDate: '2023-01-31', status: 'Completado' },
        { startDate: '2023-02-01', endDate: '2023-02-28', status: 'Pendiente' },
        { startDate: '2023-03-01', endDate: '2023-03-31', status: 'Completado' },
        { startDate: '2023-04-01', endDate: '2023-04-30', status: 'Pendiente' },
        // Agrega más snapshots aquí...
    ];

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
        <div style={{ width: '80%', margin: '50px auto' }}>
            <h2>Mis snapshots</h2>
            <hr />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto', maxHeight: '140px', position: 'relative', border: '1px solid transparent' }}>
                {snapshots.map((snapshot, i) => {
                    const startDate = new Date(snapshot.startDate);
                    const endDate = new Date(snapshot.endDate);
                    const startMonthIndex = months.findIndex(month => month.getMonth() === startDate.getMonth() && month.getFullYear() === startDate.getFullYear());
                    const endMonthIndex = months.findIndex(month => month.getMonth() === endDate.getMonth() && month.getFullYear() === endDate.getFullYear());
                    const left = `${startMonthIndex / months.length * 100}%`;
                    const width = `${(endMonthIndex - startMonthIndex + 1) / months.length * 100}%`;
                    return (
                        <div key={i} style={{ position: 'relative', left, width, backgroundColor: getColor(snapshot.status), height: '10px', margin: '20px 0', borderRadius: '50%' }}>
                            <div style={{ position: 'absolute', left: '10%', width: '80%', backgroundColor: getColor(snapshot.status), height: '10px' }}></div>
                        </div>
                    );
                })}
            </div>
            <hr />
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
