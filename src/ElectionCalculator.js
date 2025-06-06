import React, { useState, useEffect } from 'react';
import wyniki from './wyniki.json';
import './ElectionCalculator.css';

const ElectionCalculator = () => {
  const [percentage, setPercentage] = useState(20);
  const [count, setCount] = useState(50);
  const [results, setResults] = useState({ districts: {}, total: 0 });
  const [selectedCandidate, setSelectedCandidate] = useState('trzaskowski');

  const calculateResults = (percentage, count) => {
    const outputDict = {};
    const pierwsza_tura_dict = wyniki.pierwsza_tura;
    const druga_tura_dict = wyniki.druga_tura;
    const kandydat = selectedCandidate;

    for (const okreg in pierwsza_tura_dict) {
      const p_kandydaci = pierwsza_tura_dict[okreg];
      const d_kandydaci = druga_tura_dict[okreg];
      const roznica_procenty = d_kandydaci[kandydat].procenty - p_kandydaci[kandydat].procenty;
      const roznica_liczba = d_kandydaci[kandydat].liczba - p_kandydaci[kandydat].liczba;

      if (roznica_procenty > percentage && roznica_liczba > count) {
        outputDict[okreg] = {
          procenty: roznica_procenty,
          liczba: roznica_liczba,
        };
      }
    }

    const suma = Object.values(outputDict).reduce((acc, curr) => acc + curr.liczba, 0);
    return { districts: outputDict, total: suma };
  };

  useEffect(() => {
    const newResults = calculateResults(percentage, count);
    setResults(newResults);
  }, [percentage, count, selectedCandidate]);

  return (
    <div className="election-calculator">
      <div className="candidates">
        <div 
          className={`candidate ${selectedCandidate === 'trzaskowski' ? 'selected' : ''}`}
          onClick={() => setSelectedCandidate('trzaskowski')}
        >
          <img src="/trzaskowski.jpg" alt="Rafał Trzaskowski" />
          <h3>Rafał Trzaskowski</h3>
        </div>
        <div 
          className={`candidate ${selectedCandidate === 'nawrocki' ? 'selected' : ''}`}
          onClick={() => setSelectedCandidate('nawrocki')}
        >
          <img src="/nawrocki.jpg" alt="Karol Nawrocki" />
          <h3>Karol Nawrocki</h3>
        </div>
      </div>

      <div className="inputs">
        <div className="input-group">
          <label htmlFor="percentage">Minimalna różnica procentowa:</label>
          <input
            type="number"
            id="percentage"
            value={percentage}
            onChange={(e) => setPercentage(Number(e.target.value))}
            min="0"
            max="100"
          />
        </div>
        <div className="input-group">
          <label htmlFor="count">Minimalna różnica w liczbie głosów:</label>
          <input
            type="number"
            id="count"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            min="0"
          />
        </div>
      </div>

      <div className="results">
        <h2>Różnica w poparciu między pierwszą a drugą turą</h2>
        <div className="disclaimer">
          <p><strong>Uwaga:</strong> Obliczenia uwzględniają głosy z pierwszej tury, które zostały rozdzielone między dwóch kandydatów w drugiej turze na podstawie sondaży. Stąd widać liczby niecałkowite.</p>
        </div>
        <p>Łączna różnica w głosach: {results.total.toFixed(1)}</p>
        <div className="districts">
          {Object.entries(results.districts)
            .sort(([, a], [, b]) => b.procenty - a.procenty)
            .map(([district, data]) => (
            <div key={district} className="district">
              <h3>Nr komisji: {district}</h3>
              <p>Różnica procentowa: {data.procenty.toFixed(2)}%</p>
              <p>Różnica w głosach: {data.liczba.toFixed(1)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ElectionCalculator; 