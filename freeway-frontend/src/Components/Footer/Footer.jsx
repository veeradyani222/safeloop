import React, { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import './Footer.css';

const Footer = () => {
  const { all_Content } = useContext(ShopContext);

  // Extract the relevant data from all_Content
  const contactNumbers = all_Content[0]?.contact_numbers || [];
  const emailIds = all_Content[0]?.email_ids || [];
  const instagram = all_Content[0]?.instagram || '';
  const github = all_Content[0]?.github || '';
  const facebook = all_Content[0]?.facebook || '';
  const twitter = all_Content[0]?.twitter || '';

  return (
    <div className='footer'>
      <div className='footer-contact'>
        <h4>Contact Us</h4>
        <ul>
          {contactNumbers.length > 0 && (
            <li>
              <strong>Contact Numbers:</strong>
              <ul>
                {contactNumbers.map((number, index) => (
                  <li key={index}>{number}</li>
                ))}
              </ul>
            </li>
          )}
          {emailIds.length > 0 && (
            <li>
              <strong>Email Addresses:</strong>
              <ul>
                {emailIds.map((email, index) => (
                  <li key={index}>{email}</li>
                ))}
              </ul>
            </li>
          )}
        </ul>
      </div>

      <div className='footer-social-media'>
        <h4>Follow Us</h4>
        <ul>
          {instagram && (
            <li>
              <a href={instagram} target='_blank' rel='noopener noreferrer'>
                Instagram
              </a>
            </li>
          )}
          {github && (
            <li>
              <a href={github} target='_blank' rel='noopener noreferrer'>
                GitHub
              </a>
            </li>
          )}
          {facebook && (
            <li>
              <a href={facebook} target='_blank' rel='noopener noreferrer'>
                Facebook
              </a>
            </li>
          )}
          {twitter && (
            <li>
              <a href={twitter} target='_blank' rel='noopener noreferrer'>
                Twitter
              </a>
            </li>
          )}
        </ul>
      </div>
      <div>by SafeLoop</div>
    </div>
  );
};

export default Footer;

