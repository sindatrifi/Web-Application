import React, { useState, useEffect } from 'react';
import { Pie, Doughnut, Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale } from 'chart.js/auto';
import VisualisationBar from './visualisationbar';
import '../UserChart.css';

ChartJS.register(CategoryScale, LinearScale);

const CandidatureEmployee = () => {
  const [offerIds, setOfferIds] = useState([]);
  const [candidatures, setCandidatures] = useState([]);
  const [civilityData, setCivilityData] = useState([]);

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
        const response = await axios.get('/api/offres');
        const fetchedOffers = response.data;

        const fetchedCandidatures = [];
        const fetchedCivilityData = [];

        for (const offer of fetchedOffers) {
          if (offer.employee === userId) {
            const offerCandidaturesResponse = await axios.get(`/api/offres/${offer._id}/candidatures`);
            const offerCandidatures = offerCandidaturesResponse.data;

            fetchedCandidatures.push(...offerCandidatures);

            for (const candidature of offerCandidatures) {
              try {
                const response = await axios.get(`/api/users/${candidature.name}`);
                const userData = response.data;
                fetchedCivilityData.push(userData.civilite);
              } catch (error) {
                console.error('Error fetching civilite data:', error);
              }
            }
          }
        }

        setCandidatures(fetchedCandidatures);
        setCivilityData(fetchedCivilityData);
      } catch (error) {
        console.error('Error fetching candidatures:', error);
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

  const filteredCandidatures = candidatures.filter(
    (candidature) =>
      candidature.etat === 'pas encore traité' || candidature.etat === 'Selectionné'
  );

  const pieChartData = {
    labels: ['Ne pas traité', 'Sélectionné'],
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

  const doughnutChartData = {
    labels: ['Homme', 'Femme'],
    datasets: [
      {
        data: [
          civilityData.filter((civility) => civility === 'homme').length,
          civilityData.filter((civility) => civility === 'femme').length,
        ],
        backgroundColor: ['#d2fcd4', '#ebd2fc'],
      },
    ],
  };

  return (
    <div className="custom-user-age-chart-container">
      <div className="visualisation-bar">
        <VisualisationBar />
      </div>
      <div className="chart-section">
        <div>
        <h2 className='titrechart'>Statistiques des candidatures reçus</h2>
          <div className="customdata-employee-number">

           <p className='number'>  Nombre de candidatures soumises: {filteredCandidatures.length}</p>

          </div>
        </div>
        <div className="chart-wrapper">

          <div className="custom-pie-chart">


            {filteredCandidatures.length > 0 ? (
              <div>
                <h6  className='chart-title' >Segmentation des candidatures par état</h6>
                <Pie data={pieChartData} options={pieOptions} />
              </div>
            ) : (
              <p>No data available for chart</p>
            )}
          </div>
          <div className="custom-pie-chart">
           
            {civilityData.length > 0 ? (
              <>
               <h6 className='chart-title'>Segmentation des candidatures par civilité</h6>
              <Doughnut data={doughnutChartData} options={doughnutOptions} />
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

export default CandidatureEmployee;
