import React, { useState, useEffect } from 'react';
import { Pie, Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import VisualisationBar from './visualisationbar';

const CandidatureCandidat = () => {
  const [offerIds, setOfferIds] = useState([]);
  const [candidatures, setCandidatures] = useState([]);
  const [civilityData, setCivilityData] = useState([]);
  const [offerTypeData, setOfferTypeData] = useState([]);
  const [offreNumber, setOffreNumber] = useState(0);
  const [userId, setUserId] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch('/api/protected', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const userId = response.headers.get('userId');
      setUserId(userId);

      const appliedOffersResponse = await axios.get(`/api/users/${userId}/applied_offers`);
      const appliedOffers = appliedOffersResponse.data;

      const fetchedOfferIds = appliedOffers.map(offer => offer._id);
      setOfferIds(fetchedOfferIds);
      setOffreNumber(fetchedOfferIds.length);

      const fetchedCandidatures = [];
      const fetchedCivilityData = [];
      const fetchedOfferTypeData = [];

      for (const offerId of fetchedOfferIds) {
        const offerResponse = await axios.get(`/api/offres/${offerId}`);
        const offer = offerResponse.data;

        const candidaturesResponse = await axios.get(`/api/offres/${offerId}/candidatures`);
        const candidatures = candidaturesResponse.data;

        fetchedCandidatures.push(...candidatures);
        fetchedOfferTypeData.push(offer.type);

        for (const candidature of candidatures) {
          fetchedCivilityData.push(candidature.etat);
        }
      }

      setCandidatures(fetchedCandidatures);
      setCivilityData(fetchedCivilityData);
      setOfferTypeData(fetchedOfferTypeData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
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
    candidature => candidature.etat === 'pas encore traité' || candidature.etat === 'Selectionné'
  );

  const barChartData = {
    labels: ['N\'est pas traitée', 'Sélectionné'],
    datasets: [
      {
        data: [
          filteredCandidatures.filter(candidature => candidature.etat === 'pas encore traité').length,
          filteredCandidatures.filter(candidature => candidature.etat === 'Selectionné').length,
        ],
        backgroundColor: ['#d1ebb2', '#36A2EB'],
      },
    ],
  };

  const offerTypes = ['Formation', 'Stage', 'Emploi'];
  const doughnutChartData = {
    labels: offerTypes,
    datasets: [
      {
        data: offerTypes.map(type => offerTypeData.filter(offerType => offerType === type).length),
        backgroundColor: [  '#a69df9',
        '#FF6384',
        '#f4f6d3',],
      },
    ],
  };

  return (
    <div className="user-age-chart-container">
      <div className="visualisation-bar">
        <VisualisationBar />
      </div>
      <div className="chart-section">
        <div>
          <h2 className='titrechart'>Statistiques des candidatures soumises</h2>
          <div className="employee-number"> <p className='number'> Nombre des candidatures: {offreNumber}</p></div>
          <div className="chart-wrapper">
            <div className="custom-pie-chart">
              {filteredCandidatures.length > 0 ? (
                 <div>
                 <h6 className='chart-title'>Répartition des candidatures par état</h6>
                <Pie data={barChartData} options={pieOptions} />
                </div>
              ) : (
                <p>No data available for chart</p>
              )}
            </div>
            <div className="custom-pie-chart">
              {civilityData.length > 0 ? (
                <div>
                  <h6 className='chart-title'>Répartition des offres par type</h6>
                  <Doughnut data={doughnutChartData} options={doughnutOptions} />
                </div>
              ) : (
                <p>No data available for chart</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatureCandidat;
