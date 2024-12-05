import React, { useState } from "react";
import "../searchbar.css";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/offre?keyword=${keyword}&location=${location}`);
  };
  return (
    <main>
      <section class="hero-section d-flex justify-content-center align-items-center">
        <div class="section-overlay"></div>

        <div class="container">
          <div class="row">

            <div class="col-lg-6 col-12 mb-5 mb-lg-0">
              <div class="hero-section-text mt-5">
                <h6 class="text-white">Vous cherchez le job de vos rêves ?</h6>

                <h1 class="hero-title text-white mt-4 mb-4">Plateforme en ligne
                  <br /> Meilleur portail d'emploi</h1>

                <a href="#categories-section" class="custom-btn custom-border-btn btn">Parcourir les catégories</a>
              </div>
            </div>
            <div class="col-lg-6 col-12">
              <form onSubmit={handleSubmit} class="custom-form hero-form" >
                <h3 class="text-white mb-3">Recherchez l'emploi de vos rêves</h3>
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-12">
                    <div class="input-group">
                      <span class="input-group-text" id="basic-addon1"><i class="fas fa-user custom-icon"></i></span>

                      <input type="text"
                        name="keyword"
                        placeholder="Mots clés "
                        value={keyword}
                        onChange={(event) => setKeyword(event.target.value)}
                        class="form-control" />
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-12">
                    <div class="input-group">
                      <span class="input-group-text" id="basic-addon2"><i class="fas fa-map-marker-alt custom-icon"></i></span>

                      <input type="text"
                        name="location"
                        placeholder="Lieu"
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                        class="form-control" />
                    </div>
                    <div class="col">

                    </div>
                  </div>

                  <div class="col-lg-12 col-12">
                    <button type="submit" class="form-control">
                      Trouver une offre
                    </button>
                  </div>

                  <div class="col-12">
                    <div class="d-flex flex-wrap align-items-center mt-4 mt-lg-0">
                      <span class="text-white mb-lg-0 mb-md-0 me-2">Mots-clés populaires:</span>

                      <div>
                        <a href="/offre?keyword=Developpement" class="motcle">Developpement</a>

                        <a href="/offre?keyword=Marketing" class="motcle">Marketing</a>

                        <a href="/offre?keyword=ingenieur" class="motcle">Ingénierie</a>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

export default SearchBar;