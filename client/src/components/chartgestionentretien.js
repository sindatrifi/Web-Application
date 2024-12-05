import React, { useState, useEffect } from 'react';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS } from 'chart.js/auto';
import VisualisationBar from './visualisationbar';

import '../UserAgeChart.css';

ChartJS.register();

const EntretienChart = () => {
  const [entretienData, setEntretienData] = useState(null);
  const [entretienNumber, setEntretienNumber] = useState(0);
  const [barChartData, setBarChartData] = useState(null);
  const [doughnutChartData, setDoughnutChartData] = useState(null);

  useEffect(() => {
    axios.get('api/entretiens')
      .then(response => {
        const entretiens = response.data;

        // Segment entretiens by type (presentiel, en_ligne)
        const presentielEntretiens = entretiens.filter(entretien => entretien.type === 'presentiel');
        const enLigneEntretiens = entretiens.filter(entretien => entretien.type === 'en_ligne');

        // Prepare the pie chart data for entretien type segmentation
        const entretienChartData = {
          labels: ['Présentiel', 'En ligne'],
          datasets: [
            {
              data: [presentielEntretiens.length, enLigneEntretiens.length],
              backgroundColor: ['#a69df9',
              '#d1ebb2'],
              borderColor: ['rgba(0, 123, 255, 1)', 'rgba(255, 99, 132, 1)'],
              borderWidth: 1,
            },
          ],
        };

        setEntretienData(entretienChartData);
        setEntretienNumber(entretiens.length);

        // Group users by offer
        const offerData = {};
        entretiens.forEach(entretien => {
          const offreId = entretien.offre;
          if (offerData[offreId]) {
            offerData[offreId] += entretien.user.length;
          } else {
            offerData[offreId] = entretien.user.length;
          }
        });

        // Fetch offer names for each entretien.offre
        const offrePromises = Object.keys(offerData).map(offreId => {
          const offreUrl = `api/offres/${offreId}`;
          return axios.get(offreUrl)
            .then(response => {
              const offreName = response.data.name;
              return { id: offreId, name: offreName };
            })
            .catch(error => {
              console.error('Error fetching offre data:', error);
              return { id: offreId, name: null };
            });
        });

        Promise.all(offrePromises)
          .then(offerNames => {
            const updatedLabels = offerNames.map(offer => offer.name || offer.id);
            const updatedBarChartData = {
              labels: updatedLabels,
              datasets: [
                {
                  label: 'Nombre d\'utilisateurs',
                  data: Object.values(offerData),
                  backgroundColor: '#2691f2',
                  borderColor: '#2691f2',
                  borderWidth: 1,
                },
              ],
            };
            setBarChartData(updatedBarChartData);
          })
          .catch(error => {
            console.error('Error fetching offre data:', error);
          });

        // Calculate accepted and refused percentages for entretiens based on date
        entretiens.forEach(entretien => {
          const acceptedCount = entretien.accepted.length;
          const refusedCount = entretien.refused.length;
          entretien.acceptedCount = acceptedCount;
          entretien.refusedCount = refusedCount;
        });
      
        // Calculate overall accepted and refused counts
        const totalAccepted = entretiens.reduce((sum, entretien) => sum + entretien.acceptedCount, 0);
        const totalRefused = entretiens.reduce((sum, entretien) => sum + entretien.refusedCount, 0);
      
        // Prepare the data for the doughnut chart
        const doughnutChartData = {
          labels: ['Accepté', 'Refusé'],
          datasets: [
            {
              data: [totalAccepted, totalRefused],
              backgroundColor: ['#FF6384', '#36A2EB'],
              borderColor: ['rgba(0, 255, 0, 1)', 'rgba(255, 0, 0, 1)'],
              borderWidth: 1,
            },
          ],
        };
      
        setDoughnutChartData(doughnutChartData);
      })
      .catch(error => {
        console.error('Error fetching entretien data:', error);
      });
  }, []);

  const pieOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
     
    },
  };

  const barOptions = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.label + ': ' + context.parsed.y.toFixed(0);
          },
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Nombre des entretiens',
        },
        beginAtZero: true,
      },
      x: {
        grid: {
          display: false,
        },
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

  return (
    <div className="user-age-chart-container">
      <div className="visualisation-bar">
        <VisualisationBar />
      </div>
      <div className="chart-section">
        <div>
          <h2 className='titrechart'>Statistiques des entretiens</h2>
          <div className="employee-number">
           <p className='number'> Nombre d'entretiens :{entretienNumber}</p>
          </div>
        </div>
        <div className="chart-wrapper">
          <div className="bar-chart">
            {barChartData ? (
              <div>
                <h6 className="chart-title">Nombre d'entretiens par offre</h6>
                <Bar data={barChartData} options={barOptions} />
              </div>
            ) : (
              <p className="loading-message">Chargement des données du graphique...</p>
            )}
          </div>
          <div className="custom-pie-chart">
            {entretienData ? (
              <div>
                <h6 className="chart-title">Segmentation des entretiens par type</h6>
                <Pie data={entretienData} options={pieOptions} />
              </div>
            ) : (
              <p className="loading-message">Chargement des données du graphique...</p>
            )}
          </div>
          </div>
          <div className="custom-pie-chart">
            {doughnutChartData ? (
              <div>
                <h6 className="chart-title">Nombre des candidats acceptés et refusés</h6>
                <Doughnut data={doughnutChartData} options={doughnutOptions} />
              </div>
            ) : (
              <p className="loading-message">Chargement des données du graphique...</p>
            )}
          </div>
        </div>
      </div>
    
  );
};

export default EntretienChart;
