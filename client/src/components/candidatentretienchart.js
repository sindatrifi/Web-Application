import React, { useState, useEffect } from 'react';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS } from 'chart.js/auto';
import VisualisationBar from './visualisationbar';

import '../UserAgeChart.css';

ChartJS.register();

const EntretienCandidatChart = () => {
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

        // Filter entretiens where entretien.user includes userId
        const filteredEntretiens = entretiens.filter(entretien => entretien.user.includes(userId));

        // Segment entretiens by type (en_ligne, presentiel)
        const enLigneEntretiens = filteredEntretiens.filter(entretien => entretien.type === 'en_ligne');
        const presentielEntretiens = filteredEntretiens.filter(entretien => entretien.type === 'presentiel');

        // Prepare the pie chart data for entretien type segmentation
        const entretienChartData = {
          labels: ['En ligne', 'Présentiel'],
          datasets: [
            {
              data: [enLigneEntretiens.length, presentielEntretiens.length],
              backgroundColor: ['#a69df9',
              '#d1ebb2'],
              borderColor: ['rgba(0, 123, 255, 1)', 'rgba(255, 99, 132, 1)'],
              borderWidth: 1,
            },
          ],
        };

        setEntretienData(entretienChartData);
        setEntretienNumber(filteredEntretiens.length);

        // Calculate accepted and refused counts for each entretien
        filteredEntretiens.forEach(entretien => {
          const currentDate = new Date();
          const entretienDate = new Date(entretien.date);
          entretien.passed = entretienDate < currentDate;
        });

        // Calculate overall accepted and refused counts
        const passedCount = filteredEntretiens.filter(entretien => entretien.passed).length;
        const notPassedCount = filteredEntretiens.filter(entretien => !entretien.passed).length;

        // Prepare the data for the bar chart
        const barChartData = {
          labels: ['Passé', 'Non passé'],
          datasets: [
            {
              label: "Nombre d'entretiens",
              data: [passedCount, notPassedCount],
              backgroundColor: ['#2691f2','#f71750'],
              borderColor: ['rgba(0, 255, 0, 1)', 'rgba(255, 0, 0, 1)'],
              borderWidth: 1,
              barPercentage: 0.5, // Adjust the value to control the width of the bars
              categoryPercentage: 0.7, // Adjust the value to control the spacing between bars
            },
          ],
        };
        
        setBarChartData(barChartData);

        // Calculate the percentages for the doughnut chart
        const acceptedCount = entretiens.reduce((count, entretien) => {
          if (entretien.accepted.includes(userId)) {
            return count + 1;
          }
          return count;
        }, 0);

        const refusedCount = entretiens.reduce((count, entretien) => {
          if (entretien.refused.includes(userId)) {
            return count + 1;
          }
          return count;
        }, 0);

        // Prepare the data for the doughnut chart
        const doughnutChartData = {
          labels: ['Accepté', 'Refusé'],
          datasets: [
            {
              data: [acceptedCount, refusedCount],
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
          text: "Nombre d'entretiens",
        },
        beginAtZero: true,
      },
      x: {
        grid: {
          display: false,
        },
        barPercentage: 0.5, // Adjust the value to control the width of the bars
        categoryPercentage: 0.7, // Adjust the value to control the spacing between bars
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
            <p className='number'>  Nombre d'entretiens : {entretienNumber}</p>
          </div>
        </div>
        <div className="chart-wrapper">
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
          <div className="custom-pie-chart">
            {doughnutChartData ? (
              <div>
                <h6 className="chart-title">Nombre des entretiens acceptés et refusés</h6>
                <Doughnut data={doughnutChartData} options={doughnutOptions} />
              </div>
            ) : (
              <p className="loading-message">Chargement des données du graphique...</p>
            )}
          </div>
  
          </div>
          <div className="margebar">
            {barChartData ? (
              <div>
                <h6 className="chart-title">Nombre d'entretiens passés et non passés</h6>
                <Bar data={barChartData} options={barOptions} />
              </div>
            ) : (
              <p className="loading-message">Chargement des données du graphique...</p>
            )}
          </div>
          
      </div>
    </div>
  );
};

export default EntretienCandidatChart;
