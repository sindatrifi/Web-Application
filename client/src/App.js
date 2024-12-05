import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
  Router
} from "react-router-dom";

import Register from './pages/Register';
import HomePage from './pages/mainhome';
import UserList from './pages/ShowUser';
import UserProfile from './pages/Editprofile';
import MyForm from './pages/CandidatFormulare';
import Education from './pages/education';
import Experience from './pages/experience';
import Information from './pages/informationsgenerales';
import InformationProfessionelles from './pages/informationprofessionelles';
import UpdateUser from './pages/UpdateUsers';
import Footerpage from './components/footer';
import Navbar from './components/Navbar';
import Login from './pages/login';
import ProtectedRoute from './components/Protectedroutes';
import ChangePasswordPage from './pages/profile';
import OffresList from './pages/offres';
import OffreDetails from './pages/offredetails';
import AddOffre from './pages/Addoffres';
import EditOffre from './pages/updateoffre';
import CandidatureForm from './pages/Candidatureform';
import EntretienList from './pages/afficherentretien';
import EditEntretien from './pages/updateentretien';
import SubmittedOffers from './pages/submittedoffers';
import ShowForm from './pages/formulairecandidat';
import EditForm from './pages/EditForm';
import CandidatureList from './pages/listcandidatures';
import NotificationList from './pages/notification';
import UserAgeChart from './components/charts';
import CandidatureDetail from './pages/candidaturedetail';
import FormationList from './pages/listformation';
import EditFormation from './pages/updateformationlist';
import EmployeeList from './pages/showemployees';
import CandidatList from './pages/showcandidats';
import Emploi from './pages/emploi';
import Formation from './pages/formation';
import Stage from './pages/stage';
import EntretienUser from './pages/Entretienuser';
import MyoffresList from './pages/mesoffres';
import MyFormationList from './pages/mesformations';
import MystagesList from './pages/messtages';
import EditCandidatureForm from './pages/editcandidature';
import Historique from './pages/historique';
import FormationUser from './pages/formationsUser';
import AdminEntretienList from './pages/allentretien';
import AdminFormationList from './pages/allformation';
import CandidatgestionChart from './components/chartgestiondescandidats';
import OffreChart from './components/chartgestionoffre';
import EntretienChart from './components/chartgestionentretien';
import CandidaturegestionChart from './components/chartgestioncandidature';
import OffreEmployee from './components/chartoffremployee';
import CandidatureEmployee from './components/chartcandidatureemployee';
import EntretienEmployeeChart from './components/chartentretienemployee';
import FormationEmployeeChart from './components/chartformationemployee';
import CandidatureCandidat from './components/candidatoffrechart';
import EntretienCandidatChart from './components/candidatentretienchart';
import FormationCandidatChart from './components/candidatformationchart';


function App() {


  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/dashbord' element={<ProtectedRoute><UserAgeChart /></ProtectedRoute>} />
        <Route path='/dashbordgestioncandidats' element={<ProtectedRoute><CandidatgestionChart /></ProtectedRoute>} />
        <Route path='/dashbordgestionoffres' element={<ProtectedRoute><OffreChart /></ProtectedRoute>} />
        <Route path='/dashbordgestionentretiens' element={<ProtectedRoute><EntretienChart /></ProtectedRoute>} />
        <Route path='/dashbordgestioncandidatures' element={<ProtectedRoute><CandidaturegestionChart /></ProtectedRoute>} />
        <Route path='/dashborddemployeecandidatures' element={<ProtectedRoute><CandidatureEmployee /></ProtectedRoute>} />
        <Route path='/dashbordemployeeoffre' element={<ProtectedRoute><OffreEmployee /></ProtectedRoute>}/>
        <Route path='/dashbordemployeeentretiens' element={<ProtectedRoute><EntretienEmployeeChart /></ProtectedRoute>}/>
        <Route path='/dashbordemployeeformations' element={<ProtectedRoute><FormationEmployeeChart/></ProtectedRoute>}/>
        <Route path='/dashbordcandidatformations' element={<ProtectedRoute><FormationCandidatChart/></ProtectedRoute>}/>
        <Route path='/dashbordcandidatentretiens' element={<ProtectedRoute><EntretienCandidatChart/></ProtectedRoute>}/>
        <Route path='/dashbordcandidatoffre' element={<ProtectedRoute><CandidatureCandidat/></ProtectedRoute>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/User/:id" element={<UpdateUser />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/employee" element={<EmployeeList/>} />
        <Route path="/candidat" element={<CandidatList/>} />
        <Route path="/emplois" element={<ProtectedRoute><Emploi /></ProtectedRoute>} />
        <Route path="/formations" element={<ProtectedRoute><Formation /></ProtectedRoute>} />
        <Route path="/mesentretiens" element={<ProtectedRoute><EntretienUser /></ProtectedRoute>} />
        <Route path="/userformations" element={<ProtectedRoute><FormationUser /></ProtectedRoute>} />
        <Route path="/mesemplois" element={<ProtectedRoute><MyoffresList/></ProtectedRoute>} />
        <Route path="/mesformations" element={<ProtectedRoute><MyFormationList/></ProtectedRoute>} />
        <Route path="/messtages" element={<ProtectedRoute><MystagesList/></ProtectedRoute>} />
        <Route path="/adminentretien" element={<ProtectedRoute>< AdminEntretienList/></ProtectedRoute>} />
        <Route path="/adminformation" element={<ProtectedRoute>< AdminFormationList/></ProtectedRoute>} />
        <Route path="/stages" element={<ProtectedRoute><Stage /></ProtectedRoute>} />
        <Route path="offres/:id/edit_candidature" element={<ProtectedRoute><EditCandidatureForm /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/education" element={<ProtectedRoute><Education /></ProtectedRoute>} />
        <Route path="/experience/:id" element={<ProtectedRoute><Experience /></ProtectedRoute>} />
        <Route path="/experience/" element={<ProtectedRoute><Experience /></ProtectedRoute>} />
        <Route path="/informationsgenerales/:id" element={<ProtectedRoute><Information /></ProtectedRoute>} />
        <Route path="/informationsgenerales" element={<ProtectedRoute><Information /></ProtectedRoute>} />
        <Route path="/changepassword/:userId" element={<ProtectedRoute><ChangePasswordPage /></ProtectedRoute>} />
        <Route path="/formulaire" element={<ProtectedRoute><MyForm /></ProtectedRoute>} />
        <Route path="/offres/:id/candidatures" element={<ProtectedRoute><CandidatureList /></ProtectedRoute>} />
        <Route path="/offres/:id/candidatures/:candidatureid" element={<ProtectedRoute><CandidatureDetail /></ProtectedRoute>} />
        <Route path="/offre" element={<OffresList />} />
        <Route exact path="/offres/:id" element={<OffreDetails />} />
        <Route exact path="/offres/:id/edit" element={<ProtectedRoute><EditOffre /></ProtectedRoute>} />
        <Route path="/addoffre" element={<ProtectedRoute><AddOffre /></ProtectedRoute>} />
        <Route path="/offres/:id/postuler" element={<ProtectedRoute><CandidatureForm /></ProtectedRoute>} />
        <Route path="/informationsprofessionelles/:id" element={<ProtectedRoute><InformationProfessionelles /></ProtectedRoute>} />
        <Route path="/informationsprofessionnelles" element={<ProtectedRoute><InformationProfessionelles /></ProtectedRoute>} />
        <Route exact path="/entretiens" element={<ProtectedRoute><EntretienList /></ProtectedRoute>} />
        <Route path="/entretien/:id" element={<ProtectedRoute><EditEntretien /></ProtectedRoute>} />
        <Route path="/formation/:id" element={<ProtectedRoute><EditFormation /></ProtectedRoute>} />
        <Route path="/historique" element={<ProtectedRoute><Historique /></ProtectedRoute>} />

        <Route path="/education/:id" element={<ProtectedRoute><Education /></ProtectedRoute>} />
        <Route path="/education" element={<ProtectedRoute><Education /></ProtectedRoute>} />
        <Route path="/profileuser" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        <Route path="/candidatform" element={<ProtectedRoute><ShowForm /></ProtectedRoute>} />
        <Route path="/edit-candidat-form" element={<ProtectedRoute><EditForm /></ProtectedRoute>} />
        <Route path="/Notification" element={<ProtectedRoute><NotificationList /></ProtectedRoute>} />
        <Route path="/FormationList" element={<ProtectedRoute><FormationList /></ProtectedRoute>} />

      </Routes>
   
      <Footerpage />
    </BrowserRouter>


  );
}

export default App;
