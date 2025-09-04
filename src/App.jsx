import React, { useState } from 'react';
import { zdjecia as daneZdjec } from './assets/dane';

function App() {
  const [kategorie, setKategorie] = useState({
    kwiaty: true,
    zwierzeta: true,
    samochody: true,
  });

  const [zdjecia, setZdjecia] = useState(daneZdjec);

  const toggleKategoria = (kat) => {
    setKategorie(prev => ({ ...prev, [kat]: !prev[kat] }));
  };

  const handleDownload = (id) => {
    setZdjecia(prev =>
      prev.map(z =>
        z.id === id ? { ...z, downloads: z.downloads + 1 } : z
      )
    );
  };

  const filtrujKategorie = (kategoria) => {
    switch (kategoria) {
      case 1: return kategorie.kwiaty;
      case 2: return kategorie.zwierzeta;
      case 3: return kategorie.samochody;
      default: return false;
    }
  };

  return (
    <div className="container mt-4">
      <h1>Kategorie zdjęć</h1>

      <div className="form-check form-switch form-check-inline">
        <input
          className="form-check-input"
          type="checkbox"
          id="kwiaty"
          checked={kategorie.kwiaty}
          onChange={() => toggleKategoria('kwiaty')}
        />
        <label htmlFor="kwiaty">Kwiaty</label>
      </div>

      <div className="form-check form-switch form-check-inline">
        <input
          className="form-check-input"
          type="checkbox"
          id="zwierzeta"
          checked={kategorie.zwierzeta}
          onChange={() => toggleKategoria('zwierzeta')}
        />
        <label  htmlFor="zwierzeta">Zwierzęta</label>
      </div>

      <div className="form-check form-switch form-check-inline">
        <input
          className="form-check-input"
          type="checkbox"
          id="samochody"
          checked={kategorie.samochody}
          onChange={() => toggleKategoria('samochody')}
        />
        <label htmlFor="samochody">Samochody</label>
      </div>

      <div className="d-flex flex-wrap">
        {zdjecia.filter(z => filtrujKategorie(z.category)).map(z => (
          <div key={z.id}>
            <img
              src={`assets/${z.filename}`}
              alt={z.alt}
            />
            <h4>{z.downloads} pobrań</h4>
            <button
              className="btn btn-success"
              onClick={() => handleDownload(z.id)}
            >
              Pobierz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;