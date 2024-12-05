import React, { useState, useEffect } from 'react';
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2'; import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale } from 'chart.js/auto';
import VisualisationBar from './visualisationbar';
import '../UserChart.css';

ChartJS.register(CategoryScale, LinearScale);

const CandidatgestionChart = () => {
    const [chartData, setChartData] = useState(null);
    const [genderChartData, setGenderChartData] = useState(null);
    const [appliedOffersData, setAppliedOffersData] = useState(null);
    const [candidateNumber, setCandidateNumber] = useState(0);
    const [lineChartData, setLineChartData] = useState(null);
    useEffect(() => {
        axios
            .get('api/users')
            .then(response => {
                const users = response.data;

                // Filter users with the role "candidate"
                const candidates = users.filter(user => user.Role === 'candidat');

                // Sort candidates by their age
                candidates.sort((a, b) => a.Age - b.Age);

                // Extract the required data from the candidates
                const labels = candidates.map(candidate => `${candidate.Firstname} ${candidate.Lastname}`);
                const values = candidates.map(candidate => candidate.Age);
                const ageGroups = {
                    '18-25': 0,
                    '26-40': 0,
                    '41-60': 0
                  };
          
                  values.forEach(age => {
                    if (age >= 18 && age <= 25) {
                      ageGroups['18-25']++;
                    } else if (age > 25 && age <= 40) {
                      ageGroups['26-40']++;
                    } else if (age > 40 && age <= 60) {
                      ageGroups['41-60']++;
                    }
                  });
                 
                  const doughnutChartData = {
                    labels: Object.keys(ageGroups),
                    datasets: [
                      {
                        data: Object.values(ageGroups),
                        backgroundColor: [
                          '#a69df9',
                          '#d1ebb2',
                          '#f4f6d3',
                        ],
                        borderColor: [
                          'rgba(255, 59, 132, 1)',
                          'rgba(14, 162, 11, 1)',
                          'rgba(255, 216, 46, 1)',
                        ],
                        borderWidth: 1,
                      },
                    ],
                  };
                  setChartData(doughnutChartData);
                // Prepare the bar chart data
               

                // Calculate the count of male and female candidates
                const maleCount = candidates.filter(candidate => candidate.civilite === 'homme').length;
                const femaleCount = candidates.filter(candidate => candidate.civilite === 'femme').length;

                // Prepare the pie chart data
                const pieChartData = {
                    labels: ['Homme', 'Femme'],
                    datasets: [
                        {
                            data: [maleCount, femaleCount],
                            backgroundColor: ['#d0f6eb', '#ebd2fc'],
                            borderColor: ['rgba(0, 123, 255, 1)', 'rgba(255, 99, 132, 1)'],
                            borderWidth: 1,
                        },
                    ],
                };

                setGenderChartData(pieChartData);

                // Fetch the applied offers data for each candidate
                const fetchAppliedOffersData = async () => {
                    const requests = candidates.map(candidate =>
                        axios.get(`api/users/${candidate._id}/applied_offers`)
                    );
                    const responses = await Promise.all(requests);
                    const appliedOffersCounts = responses.map(response => response.data.length);

                    // Prepare the line chart data
                    const lineChartData = {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Candidatures postulées',
                                data: appliedOffersCounts,
                                backgroundColor: '#f71750',
                                borderColor: '#f71750',
                                borderWidth: 1,
                            },
                        ],
                    };

                    setAppliedOffersData(lineChartData);
                };

                fetchAppliedOffersData();
                setCandidateNumber(candidates.length);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const barOptions = {
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Candidats',
                },
                beginAtZero: true,
            },
            y: {
                title: {
                    display: true,
                    text: 'Âge',
                },
                beginAtZero: true,
            },
        },
    };

    const pieOptions = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
            },
        },
    };
    const doughnutOptions = {
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
        },
      };
    const lineOptions = {
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Candidats',
                },
                beginAtZero: true,
            },
            y: {
                title: {
                    display: true,
                    text: 'Nombre d\'offres',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div class="custom-user-age-chart-container">
        <div class="visualisation-bar">
          <VisualisationBar />
        </div>
        <div class="custom-chart-section">
       
        <div>
        <h2 className='titrechart'>Statistiques des candidats</h2>
        <div class="custom-employee-number"><p className='number'> Nombre de candidats: {candidateNumber}</p></div>
        </div>
        <div class="marge custom-line-chart">
            {appliedOffersData ? (
              <div>
                <h6 className='chart-title'>Nombre des candidatures soumises par chaque candidat</h6>
                <Line data={appliedOffersData} options={lineOptions} />
              </div>
            ) : (
              <p class="custom-loading-message">Chargement des données du graphique...</p>
            )}
          </div>
          <div class="custom-chart-wrapper">
            
            <div class="custom-Doughnut-chart">
      
              
              {chartData ? (

                <>
                 <h6 className='chart-title'>Segmentation des candidats par âge</h6>

                <Doughnut data={chartData} options={doughnutOptions} />
                </>
              ) : (
                <p class="custom-loading-message">Chargement des données du graphique...</p>
              )}
            </div>
            <div class="custom-pie-chart">
              {genderChartData ? (
                <div>
                  <h6 className='chart-title'>Segmentation des candidats par civilité</h6>
                  <Pie data={genderChartData} options={pieOptions} />
                </div>
              ) : (
                <p class="custom-loading-message">Chargement des données du graphique...</p>
              )}
            </div>
          </div>
         
        </div>
      </div>
    );
};

export default CandidatgestionChart;
