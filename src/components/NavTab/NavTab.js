import React from 'react';
import './NavTab.css';

function NavTab() {
  return (
    <section className="navtab__container">
           <button className="navtab__btn">О проекте</button>
          <button className="navtab__btn"> Технологии</button>
          <button className="navtab__btn">Студент</button>
    </section>
  );
}

export default NavTab;