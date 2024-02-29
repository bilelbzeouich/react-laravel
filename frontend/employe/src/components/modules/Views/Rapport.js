import React, { useState } from 'react'
import { CChart } from '@coreui/react-chartjs'
import Constants from '../../../Constants'
import axios from 'axios';
import { useEffect } from 'react';
const Rapport = () => {

    const [rapport, setRapport] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [data, setData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    useEffect(() => {
        axios.get(Constants.BASE_URL + '/rapport')
            .then(response => {
                console.log(response.data);
                setRapport(response.data);
                setErrorMessage('');
            })
            .catch(error => {
                console.log(error.response.data.message);
                setErrorMessage(error.response.data.message);
            });
    }, []);

    useEffect(() => {
        const newData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        rapport.forEach(item => {
            const monthIndex = new Date(item.date_livraison).getMonth();
            newData[monthIndex] += item.prix / 1000;
        });
        setData(newData);
    }, [rapport]);


    return (
        <div class="col-md-12">
            <div class="card">

                <div class="card-body ">
                    <div className="size-card left">
                        <CChart
                            type="bar"
                            data={{
                                labels: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
                                datasets: [
                                    {
                                        label: 'vente',
                                        backgroundColor: '#4BB543',
                                        data: data,
                                    },
                                ],
                            }}
                            labels="months"
                        />
                    </div>
                    <div className="size-card-cercle right">
                        <CChart
                            type="doughnut"
                            data={{
                                labels: ['agricole', 'outils', 'equipement', 'pompe'],
                                datasets: [
                                    {
                                        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                                        data: [40, 20, 80, 10],
                                    },
                                ],
                            }}
                            options={{
                                legend: {
                                    position: 'bottom',
                                    labels: {
                                        display: false,
                                    },
                                },
                            }}
                        />
                    </div>



                </div>
            </div>
        </div>
    )
}

export default Rapport