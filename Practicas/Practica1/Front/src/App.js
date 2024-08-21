import React, { useState } from 'react';

import './App.css';
import Pantalla1 from './pages/pantalla1';
import Pantalla2 from './pages/pantalla2';
import Pantalla3 from './pages/pantalla3';

function App() {
  const [selectedTab, setSelectedTab] = useState('contente1');
  
  const handleTabChange = (event) => {
    setSelectedTab(event.target.id.replace('tab', 'content')); 
  };

  const [cambiosParte1, setCambiosParte1] = useState(false);
  const changeParte1 = () => {
    if (cambiosParte1) setCambiosParte1(!cambiosParte1)
      else setCambiosParte1(true)
  }

  const [cambiosParte2, setCambiosParte2] = useState(false);
  const changeParte2 = () => {
    if (cambiosParte2) setCambiosParte2(!cambiosParte2)
      else setCambiosParte2(true)
  }

  const [cambiosParte3, setCambiosParte3] = useState(false);
  const changeParte3 = () => {
    if (cambiosParte3) setCambiosParte3(!cambiosParte3)
      else setCambiosParte3(true)
  }

  return (
    <div className='usuario-data3'>
      <div className='group-usuario-nombre'>
        <main className="container-x">
          <div className='barmenu'>
              <div className='Menux'><b>Menu</b></div>
              <div className='labels-container'>
                  <input id="tabe1" type="radio" name="tabs-1" defaultChecked onChange={handleTabChange} />
                  <label htmlFor="tabe1" className="label-type">Notes</label>
                  <input id="tabe2" type="radio" name="tabs-1" onChange={handleTabChange} />
                  <label htmlFor="tabe2" className="label-type">Add Note</label>
                  <input id="tabe3" type="radio" name="tabs-1" onChange={handleTabChange} />
                  <label htmlFor="tabe3" className="label-type">Archived</label>
              </div>
          </div>


          <div className='content-type'>
            <section id="contente1" className={`tabs-contentype ${selectedTab === 'contente1' && 'active'}`}>
              <div className='notecraft'><label className='note-prim'>Note</label><label className='note-sec'>Craft</label></div>
              <Pantalla1 cambios={cambiosParte1} setCambios={changeParte3} setChange={changeParte1} change2={changeParte2} />
            </section>
            <section id="contente2" className={`tabs-contentype ${selectedTab === 'contente2' && 'active'}`}>
              <div className='notecraft'><label className='note-prim'>Note</label><label className='note-sec'>Craft</label></div>
              <Pantalla2 cambios={cambiosParte2} setCambios={changeParte1} setChange={changeParte2} />
            </section>
            <section id="contente3" className={`tabs-contentype ${selectedTab === 'contente3' && 'active'}`}>
              <div className='notecraft'><label className='note-prim'>Note</label><label className='note-sec'>Craft</label></div>
              <Pantalla3 cambios={cambiosParte3} setCambios={changeParte1} setChange={changeParte3} />
            </section>
          </div>
        </main>
      </div>
    </div>

  );
}

export default App;
