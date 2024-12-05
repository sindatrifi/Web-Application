import React, { useState, useEffect } from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale } from 'chart.js/auto';
import VisualisationBar from './visualisationbar';
import '../UserAgeChart.css';


ChartJS.register(CategoryScale, LinearScale);

const OffreEmployee = () => {
  const [typeData, setTypeData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [candidatureData, setCandidatureData] = useState(null);
  const [offreNumber, setOffreNumber] = useState(0);

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
      const userId = await getUserId();
      try {
        const response = await axios.get('api/offres');
        const offres = response.data;
    
        // Filter offres where offre.employee === userId
        const filteredOffres = offres.filter(offre => offre.employee === userId);
    
        // Segment filtered offres by type (Formation, Emploi, Stage)
        const formationOffres = filteredOffres.filter(offre => offre.type === 'Formation');
        const emploiOffres = filteredOffres.filter(offre => offre.type === 'Emploi');
        const stageOffres = filteredOffres.filter(offre => offre.type === 'Stage');
    
        // Segment filtered offres by location
        const locations = filteredOffres.map(offre => offre.lieu);
        const locationCounts = {};
        locations.forEach(location => {
          if (locationCounts[location]) {
            locationCounts[location] += 1;
          } else {
            locationCounts[location] = 1;
          }
        });
        const locationLabels = Object.keys(locationCounts);
        const locationValues = Object.values(locationCounts);
    
        // Prepare the pie chart data for type segmentation
        const typeChartData = {
          labels: ['Formation', 'Emploi', 'Stage'],
          datasets: [
            {
              data: [formationOffres.length, emploiOffres.length, stageOffres.length],
              backgroundColor: [  '#a69df9',
              '#d1ebb2',
              '#f4f6d3',],
              borderColor: ['rgba(0, 123, 255, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 205, 86, 1)'],
              borderWidth: 1,
            },
          ],
        };
    
        // Prepare the bar chart data for location segmentation
        const locationChartData = {
          labels: locationLabels,
          datasets: [
            {
              label: 'Fréquence',
              data: locationValues,
              backgroundColor: '#2691f2',
              borderColor: '#2691f2',
              borderWidth: 1,
              barPercentage: 0.5, // Adjust the width of the bars
            },
          ],
        };
    
        // Calculate the number of candidatures for each offre
        const candidatureCounts = filteredOffres.map(offre => offre.candidatures.length);
    
        // Prepare the line chart data for candidature count
        const candidatureCountData = {
          labels: filteredOffres.map(offre => offre.name),
          datasets: [
            {
              label: 'Nombre de candidatures',
              data: candidatureCounts,
              backgroundColor: '#f71750',
              borderColor: '#f71750',
              borderWidth: 1,
              fill: false,
            },
          ],
        };
    
        setTypeData(typeChartData);
        setLocationData(locationChartData);
        setCandidatureData(candidatureCountData);
        setOffreNumber(filteredOffres.length);
      } catch (error) {
        console.error('Error fetching offer data:', error);
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
            return context.label + ': ' + value + ' (' + percentage + '%)';
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
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Lieu',
        },
        beginAtZero: true,
      },
      y: {
        title: {
          display: true,
          text: 'Numbre d\'offres',
        },
        beginAtZero: true,
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
          text: 'Offre',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Nombre de candidatures',
        },
        beginAtZero: true,
      },
    },
  };

  const offreNumberStyle = {
    backgroundColor: '#e74c3c',
    color: '#ffffff',
    padding: '8px 16px',
    borderRadius: '8px',
    display: 'inline-block',
  };

  return (
    <div className="user-age-chart-container">
      <div className="visualisation-bar">
        <VisualisationBar />
      </div>
      <div className="chart-section">
        <div>
        <h2 className='titrechart'>Statistiques des offres </h2>
          <div className="employee-number">
         
          <p className='number'> Nombre d'offres : {offreNumber}</p>
          </div>
        </div>
        <div className="chart-wrapper">
          <div className="bar-chart">
            {locationData ? (
              <div>
                <h6 className="chart-title">Segmentation des offres par lieu</h6>
                <Bar data={locationData} options={barOptions} />
              </div>
            ) : (
              <p className="loading-message">Chargement des données du graphique...</p>
            )}
          </div>
          <div className="custom-pie-chart">
            {typeData ? (
              <div>
                <h6 className="chart-title">Segmentation des offres par type</h6>
                <Pie data={typeData} options={pieOptions} />
              </div>
            ) : (
              <p className="loading-message">Chargement des données du graphique...</p>
            )}
          </div>
        </div>
        <div className="offre-line-chart">
          {candidatureData ? (
            <div>
              <h6 className="chart-title">Nombre de candidatures par offre</h6>
              <Line data={candidatureData} options={lineOptions} />
            </div>
          ) : (
            <p className="loading-message">Chargement des données du graphique...</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default OffreEmployee;
