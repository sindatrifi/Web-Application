import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../UserProfileedit.css';
import ProfileBar from '../components/profilebar';
import { Link } from 'react-router-dom';
const calculateAge = (dateString) => {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const UserProfile = () => {
  const [user, setUser] = useState({
    Firstname: '',
    Lastname: '',
    Email: '',
    Age: '',
    Phone: '',
    Adress: '',
    civilite:'',
    ville:'',
    Npostal:'',
  });

  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
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
      axios
        .get(`/api/users/${userId}`)
        .then((response) => {
          const userData = response.data;
          setUser({
            Firstname: userData.Firstname,
            Lastname: userData.Lastname,
            Email: userData.Email,
            Age: userData.Age,
            Phone: userData.Phone,
            Adress: userData.Adress,
            civilite:userData.civilite,
            Npostal:userData.Npostal,
            ville:userData.ville,
            Datenaissance:userData.Datenaissance,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
      Age: name === "Datenaissance" ? calculateAge(value) : prevUser.Age,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userId = await getUserId();
      const response = await axios.put(`/api/users/${userId}`, user);

      // Handle the response from your server
      console.log(response.data);

      setEditing(false);
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error(error);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = async () => {
    const userId = await getUserId();
    axios
      .get(`/api/users/${userId}`)
      .then((response) => {
        const userData = response.data;
        setUser({
          Firstname: userData.Firstname,
          Lastname: userData.Lastname,
          Email: userData.Email,
          Age: userData.Age,
          Phone: userData.Phone,
          Adress: userData.Adress,
          civilite:userData.civilite,
          Npostal:userData.Npostal,
          ville:userData.ville,
        
        });
        setEditing(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handlemodifpassword= async() => {
    const userId = await getUserId();
    navigate(`/changepassword/${userId}`);
  };
  return (
    <div className='containeredit'>
      
      {editing ? (
        <form onSubmit={handleSubmit}>
          <label>
            Prénom:
            <input
              type="text"
              name="Firstname"
              value={user.Firstname}
              onChange={handleChange}
            />
          </label>
          <label>
           Nom:
            <input
              type="text"
              name="Lastname"
              value={user.Lastname}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="Email"
              value={user.Email}
              onChange={handleChange}
            />
          </label>
          <label>
            Date de naissance:
            <input
              type="date"
              name="Datenaissance"
              value={user.Datenaissance}
              onChange={handleChange}
            />
          </label>
          <label>
            Numero de Téléphone:
            <input
              type="tel"
              name="Phone"
              value={user.Phone}
              onChange={handleChange}
            />
          </label>
         
          <label>
            Address:
            <input
              type="text"
              name="Adress"
              value={user.Adress}
              onChange={handleChange}
            />
          </label>
          <label>
            ville:
            <input
              type="text"
              name="ville"
              value={user.ville}
              onChange={handleChange}
            />
          </label>
          <label>
            N postal:
            <input
              type="text"
              name="Npostal"
              value={user.Npostal}
              onChange={handleChange}
            />
          </label>
         
          <div>
          <button type="submit">Sauvegarder</button>
          <button
 type="button"
 className='btn-secondary'
 onClick={handleCancel}
>
 Annuler
</button>
</div>
</form>
) : (
<div className="profile">
<ProfileBar/>
     <div className="card">
     
         <div className="card-body">
             
             <table>
                 <tbody>
                     <tr>
                         <td>Prénom</td>
                         <td>:</td>
                         <td>{user.Firstname}</td>
                       
                     </tr>
                   <td>Nom</td>
                         <td>:</td>
                         <td>{user.Lastname}</td>
                     <tr>
                         <td>Email</td>
                         <td>:</td>
                         <td>{user.Email} </td>
                     </tr>
                     <tr>
                         <td>Adress</td>
                         <td>:</td>
                         <td>{user.Adress}</td>
                     </tr>
                     <tr>
                         <td>Num_téléphone</td>
                         <td>:</td>
                         <td>{user.Phone}</td>
                     </tr>
                     <tr>
                         <td>Age</td>
                         <td>:</td>
                         <td>{user.Age}</td>
                     </tr>
                     <tr>
                         <td>civilté</td>
                         <td>:</td>
                         <td>{user.civilite}</td>
                     </tr>
                     <tr>
                         <td>ville</td>
                         <td>:</td>
                         <td>{user.ville}</td>
                     </tr>
                     <tr>
                         <td>N postal</td>
                         <td>:</td>
                         <td>{user.Npostal}</td>
                     </tr>
                    
                 </tbody>
               
             </table>
             <div className='buttonprofile'>
  
        <button className=' btnprofile' onClick={handleEdit}>Modifier profile</button>
       <button className=' btnprofile' onClick={handlemodifpassword}>Modifier mot de passe</button>
       </div>
         </div>
     </div>
     </div>
)}
</div>
);
};

export default UserProfile;