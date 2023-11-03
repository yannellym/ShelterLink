// Faqs.js
import React, { useState } from 'react';
import faqData from '../data/faqData';
import '../styles/Faqs.css';

const Faqs = () => {
  const [faqs, setFaqs] = useState(faqData);

  const toggleAccordion = (index) => {
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq, i) => ({
        ...faq,
        open: i === index ? !faq.open : false,
      }))
    );
  };

  return (
    <div className="faqs">
      <h2>Pet-Adoption FAQs</h2>
      <ul>
        {faqs.map((faq, index) => (
          <li key={index} className={faq.open ? 'open' : ''}>
            <div className="faq-header" onClick={() => toggleAccordion(index)}>
              <h3>{faq.question}</h3>
              <span className="arrow">{faq.open ? '▲' : '▼'}</span>
            </div>
            {faq.open && <p>{faq.answer}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Faqs;
