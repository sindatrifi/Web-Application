import React, { useState, useEffect } from 'react';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS } from 'chart.js/auto';
import VisualisationBar from './visualisationbar';

import '../UserAgeChart.css';

ChartJS.register();

const FormationCandidatChart = () => {
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
          const response = await axios.get('api/formations');
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
                backgroundColor: ['rgba(0, 123, 255, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                borderColor: ['rgba(0, 123, 255, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
              },
            ],
          };
  
          setEntretienData(entretienChartData);
          setEntretienNumber(filteredEntretiens.length);
  
          // Calculate accepted and refused counts for each entretien
          filteredEntretiens.forEach(entretien => {
            const acceptedCount = entretien.accepted.includes(userId) ? 1 : 0;
            const refusedCount = entretien.refused.includes(userId) ? 1 : 0;
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
                backgroundColor: ['rgba(0, 255, 0, 0.6)', 'rgba(255, 0, 0, 0.6)'],
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
            text: "Nombre d'utilisateurs",
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
            <h2 className='titrechart'> Statistiques des formations</h2>
            <div className="employee-number">
              <p className='number'> Nombre des formations : {entretienNumber}</p>
            </div>
          </div>
          <div className="chart-wrapper">
           
            <div className="custom-pie-chart">
              {entretienData ? (
                <div>
                  <h6 className="chart-title">Segmentation des formations par type</h6>
                  <Pie data={entretienData} options={pieOptions} />
                </div>
              ) : (
                <p className="loading-message">Chargement des données du graphique...</p>
              )}
            </div>
         
         </div>
        </div>
      </div>
    );
  };
  
export default FormationCandidatChart;
