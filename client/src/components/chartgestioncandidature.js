import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale } from 'chart.js/auto';
import VisualisationBar from './visualisationbar';
import '../UserChart.css';

ChartJS.register(CategoryScale, LinearScale);

const CandidaturegestionChart = () => {
  const [offerIds, setOfferIds] = useState([]);
  const [candidatures, setCandidatures] = useState([]);

  useEffect(() => {
    const fetchOfferIds = async () => {
      try {
        const response = await axios.get('/api/offres');
        const fetchedOfferIds = response.data.map((offer) => offer._id);
        setOfferIds(fetchedOfferIds);
      } catch (error) {
        console.error('Error fetching offer IDs:', error);
      }
    };

    fetchOfferIds();
  }, []);

  useEffect(() => {
    const fetchCandidatures = async () => {
      try {
        const fetchedCandidatures = [];
        for (const id of offerIds) {
          const response = await axios.get(`/api/offres/${id}`);
          const offerCandidatures = response.data.candidatures;
          fetchedCandidatures.push(...offerCandidatures);
        }
        setCandidatures(fetchedCandidatures);
      } catch (error) {
        console.error('Error fetching candidatures:', error);
      }
    };

    if (offerIds.length > 0) {
      fetchCandidatures();
    }
  }, [offerIds]);

  

  const pieOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
  };

  const filteredCandidatures = candidatures.filter(
    (candidature) =>
      candidature.etat === 'pas encore traité' || candidature.etat === 'Selectionné'
  );

  const pieChartData = {
    labels: ['N\'est pas traitée', 'Sélectionné'],
    datasets: [
      {
        data: [
          filteredCandidatures.filter((candidature) => candidature.etat === 'pas encore traité').length,
          filteredCandidatures.filter((candidature) => candidature.etat === 'Selectionné').length,
        ],
        backgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  return (
    <div className="custom-user-age-chart-container">
      <div className="visualisation-bar">
        <VisualisationBar />
      </div>
      <div className="custom-chart-section">
        <div>
          <h2 className='titrechart'>Statistiques des candidatures</h2>
          <div className="custom-employee-number"> <p className='number'> Nombre de candidats:{filteredCandidatures.length}</p></div>
        </div>
        <div className="custom-chart-wrapper">
          <div className="custom-Doughnut-chart">
            
 
            {filteredCandidatures.length > 0 ? (
              <>
              <h6 className='chart-title'>Segmentation des candidatures par état</h6>
              <Pie data={pieChartData} options={pieOptions} />
              </>
            ) : (
              <p>No data available for chart</p>
            )}
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default CandidaturegestionChart;
