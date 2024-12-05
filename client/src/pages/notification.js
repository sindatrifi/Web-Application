import React, { useState, useEffect } from 'react';
import "../notification.css"
import ProfileBar from '../components/profilebar';
function NotificationList() {
  const [notifications, setNotifications] = useState([]);
  let userId = 0;
  const getUserId = async () => {
    try {
      const response = await fetch('/api/protected', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      userId = response.headers.get('userId');
      return userId;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    async function fetchNotifications() {
      userId = await getUserId();
      console.log(userId)
      try {
        const response = await fetch(`/api/notifications/${userId}`);
        const data = await response.json();
        data.sort((a, b) => b.timestamp - a.timestamp);
        
        // Reverse the order of the notifications
        const reversedData = data.reverse();
        setNotifications(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchNotifications();
  }, [userId]);
  const formatDate = (timestamp) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(timestamp).toLocaleDateString(undefined, options);
  }
  const handleDelete = async (notificationId) => {
    try {
      await fetch(`/api/notifications/${notificationId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setNotifications(notifications.filter(notification => notification._id !== notificationId));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div> <ProfileBar />
      <section class="section-50-notif">

        <div class="container-notif">
          <h3 class="m-b-50 heading-line">Notifications <i class="fa fa-bell text-muted"></i></h3>
          <ul class="notification-ui_dd-content">
            {notifications.map(notification => (
              <li class="notification-list notification-list--unread" key={notification._id} >

                <div class="notification-list_detail">
                  <div class="notification-message">
                    <div className='notifmessage'>
                      <div className='notif'>
                        <p className='text-black' >{notification.message}</p>
                      </div>
                      <div className='notifspan'>
                        <span className='badge bg-danger'>
                          <i class="fas fa-times delete-icon" onClick={() => handleDelete(notification._id)}></i>
                        </span>
                      </div>
                    </div>
                    <p ><small>{formatDate(notification.timestamp)}</small></p>
                  </div>

                </div>

              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default NotificationList;