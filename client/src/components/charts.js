import React, { useState, useEffect } from 'react';
import { Line, Doughnut, Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale } from 'chart.js/auto';
import VisualisationBar from './visualisationbar';


import '../UserAgeChart.css';

ChartJS.register(CategoryScale, LinearScale);

const UserAgeChart = () => {
  const [chartData, setChartData] = useState(null);
  const [genderChartData, setGenderChartData] = useState(null);
  const [lineChartData, setLineChartData] = useState(null);
  const [employeeNumber, setEmployeeNumber] = useState(0);
  const [offerCounts, setOfferCounts] = useState([]);

  useEffect(() => {
    axios.get('api/users')
      .then(response => {
        const users = response.data;

        // Filter users with the role "employee"
        const employees = users.filter(user => user.Role === 'employee');

        // Sort employees by their age
        employees.sort((a, b) => a.Age - b.Age);

        // Extract the required data from the employees
        const labels = employees.map(employee => `${employee.Firstname} ${employee.Lastname}`);
        const values = employees.map(employee => employee.Age);

        // Prepare the doughnut chart data for age groups
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
        const lineChartData = {
          labels: labels, // Use the employee names as labels
          datasets: [
            {
              label: 'Nombre d\'offres',
              data: offerCounts,
              backgroundColor: '#f71750',
              borderColor: '#f71750',
              borderWidth: 1,
            },
          ],
        };
        
        setLineChartData(lineChartData);
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
       

        // Calculate the count of male and female employees
        const maleCount = employees.filter(employee => employee.civilite === 'homme').length;
        const femaleCount = employees.filter(employee => employee.civilite === 'femme').length;

        // Prepare the pie chart data
        const pieChartData = {
          labels: ['Homme', 'Femme'],
          datasets: [
            {
              data: [maleCount, femaleCount],
              backgroundColor: ['#d0f6eb', '#ebd2fc'],
              borderColor: ['#e2728d', 'rgba(255, 99, 132, 1)'],
              borderWidth: 1,
            },
          ],
        };

        setGenderChartData(pieChartData);
        setEmployeeNumber(employees.length);

        return employees; // Pass employees to the next Promise
      })
      .then(employees => {
        axios.get('api/offres')
          .then(response => {
            const offres = response.data;

            // Count the number of offers for each employee
            const employeeOffers = employees.map(employee => {
              const offerCount = offres.filter(offer => offer.employee === employee._id).length;
              return offerCount;
            });

            setOfferCounts(employeeOffers);
            
          })
          .catch(error => {
            console.error('Error fetching offer data:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

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
          text: 'Employeurs',
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

  const pieOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
  };

  const employeeNumberStyle = {
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
          <h2 className='titrechart'>Statistiques des employeurs </h2>
          <div className="employee-number">Nombre d'employeurs : {employeeNumber}</div>
        </div>
        <div className="marge custom-line-chart">
          {lineChartData  && offerCounts.length > 0 ? (
            <>
             <h6 className="chart-title">Nombre d'offres postulées par chaque employeur</h6>
                 <Line data={{ ...lineChartData, datasets: [{ ...lineChartData.datasets[0], data: offerCounts }] }} options={lineOptions} />
                 </>
          ) : (
            <p className="loading-message">Chargement des données du graphique...</p>
          )}
        </div>
        <div className="chart-wrapper">
          <div className="custom-pie-chart">
            {chartData ? (
              <>
               <h6 className="chart-title">Segmentation des employeurs par âge</h6>
              <Doughnut data={chartData} options={doughnutOptions} />
              </>
            ) : (
              <p className="loading-message">Chargement des données du graphique...</p>
            )}
          </div>
          <div className="custom-pie-chart">
            {genderChartData ? (
              <div>
                <h6 className="chart-title">Segmentation des employeurs par civilité</h6>
                <Pie data={genderChartData} options={pieOptions} />
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

export default UserAgeChart;
