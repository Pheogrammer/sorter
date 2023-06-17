import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import jsonData from '../json-data.json';

const Home = () => {
    const [tableData, setTableData] = useState(null);

    useEffect(() => {
        const processedData = {
            headers: jsonData.headers
                .filter((header) => header.column !== '')
                .map((header) => header.column),
            rows: jsonData.rows.map((row) => {
                const processedRow = row.slice(0, row.length - 1);
                const value = row[row.length - 1];
                return processedRow.map((cell, index) => {
                    const headerName = jsonData.headers[index].name;
                    if (headerName === 'dx' || headerName === 'ou' || headerName === 'pe') {
                        return jsonData.metaData.items[cell].name;
                    }
                    return cell;
                }).concat(value);
            }),
        };
        setTableData(processedData);
    }, []);

    const renderTable = () => {
        if (!tableData) {
            return <p>Loading...</p>;
        }

        const ouData = {};
        const dxData = {};

        tableData.rows.forEach((row) => {
            const period = row[2];
            const ou = row[1];
            const dx = row[0];
            const value = row[row.length - 1];

            if (!ouData[ou]) {
                ouData[ou] = [];
            }
            if (!dxData[dx]) {
                dxData[dx] = [];
            }

            ouData[ou].push({ dx, value, period });
            dxData[dx].push(period);
        });

        const periods = Array.from(new Set(tableData.rows.map((row) => row[2])));

        return (
            <div className="table-responsive">
            <table className='table  table-bordered'>
                <thead>
                    <tr>
                        <th rowSpan={2}></th>
                        {Object.entries(ouData).map(([ou]) => (
                            <th colSpan='5' key={ou}>
                                {ou}
                            </th>
                        ))}
                    </tr>
                    <tr>
                        {Object.entries(ouData).map(([ou, dxArray]) => (
                            dxArray.map((data) => (
                                data.period === periods[0] && (
                                    <th key={`${ou}-${data.dx}`}>{data.dx}</th>
                                )
                            ))
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {periods.map((period, rowIndex) => (
                        <tr key={rowIndex} className='text-right justify-content-right'>
                            <td style={{ whiteSpace: 'nowrap', textAlign: 'left' }}>{period}</td>
                            {Object.entries(ouData).map(([ou, dxArray]) => (
                                dxArray.map((data) => (
                                    data.period === period && (
                                        <td style={{ textAlign: 'right' }} className='text-right' key={`${ou}-${data.dx}`}>
                                            {parseFloat(data.value).toLocaleString(undefined, {
                                                maximumFractionDigits: Number.isInteger(parseFloat(data.value)) ? 0 : 1,
                                                minimumFractionDigits: Number.isInteger(parseFloat(data.value)) ? 0 : 1,
                                            })}
                                        </td>


                                    )
                                ))
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        );
    };

    return (
        <div>
            {renderTable()}
        </div>
    );
};

export default Home;
