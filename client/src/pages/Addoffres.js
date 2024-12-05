import React, { useState } from "react";
import axios from "axios";
import "../addoffres.css";
import Alert from "../components/Alert";

const AddOffre = () => {
  const [form, setForm] = useState({});
  const [message, setMessage] = useState("");
    const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
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

  const handleChange = (e) => {
   
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
const userId=await getUserId()
    axios.post('/api/offres', { ...form, employee: userId })
    .then((res) => {
        setMessage(res.data.message);
        setForm({});
        setErrors({}); // clear any previous errors
       
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 4000);
        window.location.href = "/offre";
      })
        
    .catch(err => setErrors(err.response.data))
};


const handleRetourClick = () => {
  window.location.href = `/offre`;
};


  return (
    
        
        <div class="container-fluid">
        <Alert message={message} show={show}/>
		<div class="row main-content bg-success text-center">
			<div class="col-md-4 text-center company__info">
				<span class="company__logo"><h2><span class="fa fa-android"></span></h2></span>
        <img src={require("../sources/poste.svg.png")} />
			</div>
			<div class="col-md-8 col-xs-12 col-sm-12 login_form ">
				<div class="container-fluid">
					<div class="row">
						<h2>Ajouter offre</h2>
					</div>
					<div class="row">
              <form onSubmit={handleSubmit} className="form-group">
              <div className="row">
                  <div className="radio-buttons despacer">

                    <label htmlFor="Role">Type</label>
                    <div>
                    <label>
                        <input
                          type="radio"
                          name="type"
                          value="Emploi"
                          onChange={handleChange}
                          checked={form.type === "Emploi"}
                          required
                        />
                       Emploi
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="type"
                          value="Formation"
                          onChange={handleChange}
                          checked={form.type === "Formation"}
                          required
                        />
                       Formation
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="type"
                          value="Stage"
                          onChange={handleChange}
                          checked={form.type === "Stage"}
                          required
                        />
                        Stage
                      </label>
                    </div>

                  
                
                  {errors.type && (
                    <div className="invalid-feedback">{errors.type}</div>
                  )}
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="name">Nom</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form__input"
                    placeholder="Entrez name"
                    value={form.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="row">
                  <label htmlFor="Description">Description</label>
                  <textarea
                    name="Description"
                    id="Description"
                    className={`form-control ${
                      errors.Description ? "is-invalid" : ""
                    }`}
                    placeholder="Entrez Description"
                    value={form.Description}
                    onChange={handleChange}
                  ></textarea>
                  {errors.Description && (
                    <div className="invalid-feedback">
                      {errors.Description}
                    </div>
                  )}
                </div>
                <div className="row">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    className="form__input"
                    placeholder="Entrez date"
                    value={form.date}
                    onChange={handleChange}
                  />
                  {errors.date && (
                    <div className="invalid-feedback">{errors.date}</div>
                  )}
                </div>
                <div className="row">
                  <label htmlFor="niveau_etude">Niveau d'études</label>
                  <input
                    type="text"
                    name="niveau_etude"
                    id="niveau_etude"
                    className="form__input"
                    placeholder="Entrez niveau d'étude"
                    value={form.niveau_etude}
                    onChange={handleChange}
                  />
                  {errors.niveau_etude && (
                    <div className="invalid-feedback">
                      {errors.niveau_etude}
                    </div>
                  )}
                </div>
                <div className="row">
                  <label htmlFor="salaire">Salaire/Coût </label>
                  <input
                    type="text"
                    name="salaire"
                    id="salaire"
                    className="form__input"
                    placeholder="Entrez salaire"
                    value={form.salaire}
                    onChange={handleChange}
                  />
                  {errors.salaire && (
                    <div className="invalid-feedback">{errors.salaire}</div>
                  )}
                </div>
                <div className="row">
                  <label htmlFor="langues">Langues</label>
                  <input
                    type="text"
                    name="langues"
                    id="langues"
                    className="form__input"
                    placeholder="Entrez langues"
                    value={form.langues}
                    onChange={handleChange}
                  />
                  {errors.langues && (
                    <div className="invalid-feedback">{errors.langues}</div>
                  )}
                </div>
                <div className="row">
                  <label htmlFor="lieu">Lieu</label>
                  <input
                    type="text"
                    name="lieu"
                    id="lieu"
                    className="form__input"
                    placeholder="Entrez lieu"
                    value={form.lieu}
                    onChange={handleChange}
                  />
                  {errors.lieu && (
                    <div className="invalid-feedback">{errors.lieu}</div>
                  )}
                </div>
                <div className="row">
                  <label htmlFor="mot_cles">Mots clés</label>
                  <textarea
                    type="text"
                    name="mot_cles"
                    id="mot_cles"
                    className="form__input"
                    placeholder="Entrez mots clés"
                    value={form.mot_cles}
                    onChange={handleChange}
                  />
                  {errors.mot_cles && (
                    <div className="invalid-feedback">{errors.mot_cles}</div>
                  )}
                </div>
                <div className="row">
                  <label htmlFor="date_dexpiration">Date d'expiration</label>
                  <input
                    type="date"
                    name="date_dexpiration"
                    id="date_dexpiration"
                    className="form__input"
                    placeholder="Entrez date d'expiration"
                    value={form.date_dexpiration}
                    onChange={handleChange}
                  />
                  {errors.date_dexpiration && (
                    <div className="invalid-feedback">
                      {errors.date_dexpiration}
                    </div>
                  )}
                </div>
                <div className="row">
                  <label htmlFor="entreprisenom">Nom d'entreprise</label>
                  <input
                    type="text"
                    name="entreprisenom"
                    id="entreprisenom"
                    className="form__input"
                    placeholder="Entrez le nom de l'entreprise"
                    value={form.entreprisenom}
                    onChange={handleChange}
                  />
                   </div>
                   <div className="row">
                  <label htmlFor="entreprisephone">Numero de téléphone </label>
                  <input
                    type="text"
                    name="entreprisephone"
                    id="entreprisephone"
                    className="form__input"
                    placeholder="Entrez le numero de télépohne de l'entreprise"
                    value={form.entreprisephone}
                    onChange={handleChange}
                  />
                   </div>
                   <div className="row">
                  <label htmlFor="entreprisemail">Mail d'entreprise</label>
                  <input
                    type="text"
                    name="entreprisemail"
                    id="entreprisemail"
                    className="form__input"
                    placeholder="Entrez le mail de l'entreprise"
                    value={form.entreprisemail}
                    onChange={handleChange}
                  />
                   </div>
                   <div className="row">
                  <label htmlFor="entreprisesite">Site d'entreprise</label>
                  <input
                    type="text"
                    name="entreprisesite"
                    id="entreprisesite"
                    className="form__input"
                    placeholder="Entrez le site de l'entreprise"
                    value={form.entreprisesite}
                    onChange={handleChange}
                  />
                   </div>
                  <div className="row">
                  <label htmlFor="date_dexpiration"> Comment Postuler ?</label>
                  <textarea
                    name="CommentPostuler"
                    id="CommentPostuler"
                    className="form__input"
                    placeholder="Entrez la méthode d'application"
                    value={form.CommentPostuler}
                    onChange={handleChange}
                  />
                   </div>
                   <div className="row">
                  <label htmlFor="CoefficientAge"> Le coefficient d'age</label>
                  <input
                  type="number"
                    name="CoefficientAge"
                    id="CoefficientAge"
                    className="form__input"
                    placeholder="Entrez le coefficient d'age"
                    value={form.CoefficientAge}
                    onChange={handleChange}
                  />
                   </div>
                   <div className="row">
                  <label htmlFor="CoefficientExperience"> Le coefficient d'expérience</label>
                  <input
                  type="number"
                    name="CoefficientExperience"
                    id="CoefficientExperience"
                    className="form__input"
                    placeholder="Entrez le coefficient d'expérience"
                    value={form.CoefficientExperience}
                    onChange={handleChange}
                  />
                   </div>
                   <div className="row">
                  <label htmlFor="CoefficientSkills">Le coefficient des compétences</label>
                  <input
                  type="number"
                    name="CoefficientSkills"
                    id="CoefficientSkills"
                    className="form__input"
                    placeholder="Entrez le coefficient des compétences"
                    value={form.CoefficientSkills}
                    onChange={handleChange}
                  />
                   </div>
                   <div className="row">
                  <label htmlFor="CoefficientLangues">Le coefficient des langues</label>
                  <input
                  type="number"
                    name="CoefficientLangues"
                    id="CoefficientLangues"
                    className="form__input"
                    placeholder="Entrez le coefficient des langues"
                    value={form.CoefficientLangues}
                    onChange={handleChange}
                  />
                   </div>
                <div className="row">
                <div class="col">
                  <button type="submit" className="bttn btn-primary">
                    Submit
                  </button>
                  </div>
                  <div class="col">
                    <button
                      type="button"
                      className=" btn-secondary space"
                      onClick={handleRetourClick}
                    >
                      Annuler
                    </button>
                    </div>
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  
  );
};
export default AddOffre;