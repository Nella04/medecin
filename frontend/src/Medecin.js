import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Chart from 'chart.js/auto';

function Medecin() {
    const [meds, setMeds] = useState([]);
    const [minPrestation, setMinPrestation] = useState(Infinity);
    const [maxPrestation, setMaxPrestation] = useState(0);
    const [TotalPrestation, setTotalPrestation] = useState(0);
    const chartRef = useRef(null);
    const chartInstance = useRef(null); // Ajout d'une référence pour stocker l'instance du graphique

    useEffect(() => {
        axios.get('http://localhost:8004/')
            .then(res => {
                setMeds(res.data);
                calculatePrestations(res.data);
            })
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy(); // Détruit le graphique existant avant d'en créer un nouveau
            }
            renderChart();
        }
    }, [meds]);

    const calculatePrestations = (data) => {
        let min = Infinity;
        let max = 0;
        let total = 0;

        data.forEach((item) => {
            const prestation = item.NombreJ * item.TauxJ;
            if (prestation < min) {
                min = prestation;
            }
            if (prestation > max) {
                max = prestation;
            }
            total += prestation;
        });

        setMinPrestation(min);
        setMaxPrestation(max);
        setTotalPrestation(total);
    };

    const handleDelete = async (Numed) => {
        
        try {
            await axios.delete("http://localhost:8004/medecin/" + Numed);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    const renderChart = () => {
        const chartData = {
            labels: meds.map(data => data.Nom),
            datasets: [{
                label: 'PRESTATION',
                data: meds.map(data => data.NombreJ * data.TauxJ),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 2
            }]
        };

        chartInstance.current = new Chart(chartRef.current, { // Stocke l'instance du graphique dans la référence
            type: 'pie',
            data: chartData,
            
        });
    };

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <h1>liste des medecins</h1>
                <Link to="/cree" className="btn btn-success mb-3">Ajouter</Link>
                
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Nombre de jour</th>
                            <th>Taux journalier</th>
                            <th>Prestation</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            meds.map((data, i) => (
                                <tr key={i}>
                                    <td>{data.Nom}</td>
                                    <td>{data.NombreJ}</td>
                                    <td>{data.TauxJ}</td>
                                    <td>{data.NombreJ * data.TauxJ}</td>
                                    <td>
                                        <Link to={`/ed/${data.Numed}`} className="btn btn-primary">Editer</Link>
                                        <button className="btn btn-danger ms-2" onClick={e => handleDelete(data.Numed)}>Supprimer</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="mb-3">
                <h3> Prestation minimum : {minPrestation} ariary</h3>
                <h3>Prestation maximum : {maxPrestation} ariary</h3>
                <h3>Total Prestation : {TotalPrestation} ariary</h3>
            </div>
            <div>
            <canvas ref={chartRef}></canvas>
            </div>
            
        </div>
    )
}

export default Medecin;
