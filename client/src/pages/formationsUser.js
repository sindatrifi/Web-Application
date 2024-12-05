import React, { useState, useEffect } from "react";
import axios from "axios";
import "../entretien.css";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import ProfileBar from "../components/profilebar";

const FormationUser = () => {
  const [entretiens, setEntretiens] = useState([]);
  const [users, setUsers] = useState([]);
  const [offres, setOffres] = useState([]);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const getUserId = async () => {
    try {
      const response = await fetch("/api/protected", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const userId = response.headers.get("userId");
      return userId;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseEntretiens = await axios.get("/api/formations");
        const responseUsers = await axios.get("/api/users");
        const responseOffres = await axios.get("/api/offres");

        setEntretiens(responseEntretiens.data);
        setUsers(responseUsers.data);
        setOffres(responseOffres.data);

        const userId = await getUserId();
        setEntretiens(responseEntretiens.data.filter((entretien) => entretien.user.includes(userId))
        .filter((entretien) => new Date(entretien.date) > new Date())
        .sort((a, b) => new Date(b.date) - new Date(a.date)));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  const getOffreTitle = (offreId) => {
    const offre = offres.find((offre) => offre._id === offreId);
    return offre ? offre.name : "";
  };
  const getEntrepriseTitle = (offreId) => {
    const offre = offres.find((offre) => offre._id === offreId);
    return offre ? offre.entreprisenom : "";
  };



  return (
    <section className=" entretiencandidat">
      
      <div className="container">
      <ProfileBar />
        <div className="row">
          <div className="col-lg-6 col-12 text-center mx-auto mb-4">
            <h2>Mes formations à passer</h2>
          </div>
          <ul className="col-lg-12 col-12">
            {entretiens.map((entretien) => (
              <li className="job-thumb d-flex">
                <div className="job-body d-flex flex-wrap flex-auto align-items-center ms-4" key={entretien._id}>
                  <div className="mb-3">
                    <h4 className="job-title mb-lg-0">
                      <span className="job-title-link">{getOffreTitle(entretien.offre)} </span>

                    </h4>
                    <div>
                    <h6 className="entrep">
                      <i className="fas fa-building custom-icon iicone"></i> {getEntrepriseTitle(entretien.offre)}
                    </h6>
                    </div>
                    {entretien.type === "presentiel" ? (
                      <>
                        <div className="d-flex flex-wrap align-items-center">
                          <p className="job-location mb-0 score text-black">
                            <i className="fas fas fa-info-circle custom-icon  iicone"></i>
                            <strong>Type:</strong>
                            {entretien.type}
                            </p>
                        </div>
                        <p className="job-location mb-0 text-black">
                          <i className="fas fa-file  custom-icon iicone"></i><strong> Documents demandés:</strong> {entretien.Documents_demandes}<br />
                          <i className="fas fa-map-marker-alt custom-icon iicone"></i>{entretien.adresse}
                        </p>
                      </>
                    ) : (<>
                      <div className="d-flex flex-wrap align-items-center">
                        <p className="job-location mb-0 score text-black"><i className="fas fas fa-info-circle custom-icon  iicone"></i><strong>Type:</strong>{entretien.type}</p>
                      </div>

                      <p className="job-location mb-0 text-black ">
                        <i className="fas fa-link  custom-icon iicone"></i><strong>URL:</strong> {entretien.url}<br />
                        <i className="fas fa-key  custom-icon iicone"></i><strong>Code d'accès:</strong> {entretien.code_access}
                      </p>
                    </>
                    )}
                    <div className="candidat">
                    <p className="job-location mb-0 text-black">

                      <i className="fas fa-calendar  custom-icon iicone"></i>{entretien.date} à {entretien.heure}h
                    </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
export default FormationUser;
