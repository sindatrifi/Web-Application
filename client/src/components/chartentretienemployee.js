import React, { useState, useEffect } from 'react';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS } from 'chart.js/auto';
import VisualisationBar from './visualisationbar';

import '../UserAgeChart.css';

ChartJS.register();

const EntretienEmployeeChart = () => {
  const [entretienData, setEntretienData] = useState(null);
  const [entretienNumber, setEntretienNumber] = useState(0);
  const [barChartData, setBarChartData] = useState(null);
  const [doughnutChartData, setDoughnutChartData] = useState(null);

  const getUserId = async () => {
    try {
      const response = await fetch('/api/protected', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const userId = response.headers.get('userId');
      return userId;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await getUserId();
        const response = await axios.get('api/entretiens');
        const entretiens = response.data;

        // Filter entretiens where entretien.employeeId === userId
        const filteredEntretiens = entretiens.filter(entretien => entretien.employeeid === userId);

        // Segment entretiens by type (presentiel, en_ligne)
        const presentielEntretiens = filteredEntretiens.filter(entretien => entretien.type === 'presentiel');
        const enLigneEntretiens = filteredEntretiens.filter(entretien => entretien.type === 'en_ligne');

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
        setEntretienNumber(filteredEntretiens.length);

        // Group users by offer
        const offerData = {};
        filteredEntretiens.forEach(entretien => {
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
            const updatedLabels = offerNames.map(offer => offer.name || offer._id);
            const updatedBarChartData = {
              labels: updatedLabels,
              datasets: [
                {
                  label: "Nombre de candidats",
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
   // Calculate accepted and refused counts for each entretien
   filteredEntretiens.forEach(entretien => {
    const acceptedCount = entretien.accepted.length;
    const refusedCount = entretien.refused.length;
    entretien.acceptedCount = acceptedCount;
    entretien.refusedCount = refusedCount;
  });

  // Calculate overall accepted and refused counts
  const totalAccepted = filteredEntretiens.reduce((sum, entretien) => sum + entretien.acceptedCount, 0);
  const totalRefused = filteredEntretiens.reduce((sum, entretien) => sum + entretien.refusedCount, 0);

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
} catch (error) {
  console.error('Error fetching entretien data:', error);
}
};

fetchData();
}, []);

  const pieOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.parsed;
            const percentage = Math.round((value / context.dataset.data.reduce((a, b) => a + b, 0)) * 100);
            return context.label + ': ' + value.toFixed(0) + ' (' + percentage + '%)';
          },
        },
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
          text: "Nombre de candidats",
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
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.parsed;
            const percentage = Math.round(value);
            return context.label + ': ' + percentage + '%';
          },
        },
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
           <p className='number'>  Nombre d'entretiens : {entretienNumber}</p>
          </div>
        </div>
        <div className="chart-wrapper">
          <div className="bar-chart">
            {barChartData ? (
              <div>
                <h6 className="chart-title">Nombre de candidats par entretien</h6>
                <div className="employeeentretien-bar-chart">
                <Bar data={barChartData} options={barOptions} />
                </div>
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
                <h6 className="chart-title">Pourcentage des entretiens acceptés et refusés</h6>
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

export default EntretienEmployeeChart;
