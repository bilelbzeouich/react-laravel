import React from 'react'
import { CChart } from '@coreui/react-chartjs'

const Rapport = () => {
    return (
        <div class="col-md-12">
            <div class="card">

                <div class="card-body ">
                    <div class="size-card .left">
                        <CChart
                            type="bar"
                            data={{
                                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                datasets: [
                                    {
                                        label: 'GitHub Commits',
                                        backgroundColor: '#4BB543',
                                        data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                                    },
                                ],
                            }}
                            labels="months"
                        />

                    </div>
                    <div class="size-card-cercle right ">
                        <CChart
                            type="doughnut"
                            data={{
                                labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
                                datasets: [
                                    {
                                        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                                        data: [40, 20, 80, 10],
                                    },
                                ],
                            }}
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Rapport