import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ChangePasswordPage = () => {
    const {userId} = useParams();
    const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.put(`/api/users/password/${userId}`, {
        currentPassword,
        newPassword,
      });

      setMessage(response.data.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      navigate(`/offre`);
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    }
  };

  return (
    <div>
      <h1>Changer le mot de passe </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="currentPassword">Mot de passe actuel:</label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="newPassword">Nouveau mot de passe:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmer mot de passe :</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Changer le mot de passe </button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
};

export default ChangePasswordPage;