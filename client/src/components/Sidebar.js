import React, { useState } from 'react';
import '../Sidebar.css';

function Sidebar() {
    const [selectedLink, setSelectedLink] = useState('');
  
    const handleLinkClick = (link) => {
      setSelectedLink(link);
    };
   
    
    
    
    
    
    const links = [
      { title: ' Intérêts Professionnels', url: '/formulaire' },
      { title: 'Informations Générales', url: '/informationsgenerales' },
      { title: 'Informations Professionelles', url: '/informationsprofessionnelles' },
      { title: 'Experience', url: '/experience' },
      { title: 'Education', url: '/education' },

    ];
  
    return (
      <div className="sidebar">
        <ul>
          {links.map((link) => (
            <li key={link.title}>
              <a
                href={link.url}
                className={link.title === selectedLink ? 'selected' : ''}
                onClick={() => handleLinkClick(link.title)}
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default Sidebar;