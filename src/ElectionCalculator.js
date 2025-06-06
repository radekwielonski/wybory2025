import React, { useState, useEffect } from 'react';
import resultsJson from './wyniki.json';
import './ElectionCalculator.css';

const ElectionCalculator = () => {
  const [percentage, setPercentage] = useState('20');
  const [count, setCount] = useState('30');
  const [results, setResults] = useState({ districts: {}, total: 0 });
  const [selectedCandidate, setSelectedCandidate] = useState('nawrocki');
  const [sortBy, setSortBy] = useState('percentage');

  const calculateResults = (percentage, count) => {
    const outputDict = {};
    const firstRound = resultsJson.pierwsza_tura;
    const secondRound = resultsJson.druga_tura;
    const perc = Number(percentage) || 0;
    const cnt = Number(count) || 0;

    for (const constituency in firstRound) {
      const firstRoundCandidateResults = firstRound[constituency];
      const secondRoundCandidateResults = secondRound[constituency];
      const diffPercentages = secondRoundCandidateResults[selectedCandidate].procenty - firstRoundCandidateResults[selectedCandidate].procenty;
      const diffNumbers = secondRoundCandidateResults[selectedCandidate].liczba - firstRoundCandidateResults[selectedCandidate].liczba;

      if (diffPercentages > perc && diffNumbers > cnt) {
        outputDict[constituency] = {
          percentage: diffPercentages,
          count: diffNumbers,
        };
      }
    }

    const total = Object.values(outputDict).reduce((acc, curr) => acc + curr.count, 0);
    return { districts: outputDict, total };
  };

  useEffect(() => {
    const newResults = calculateResults(percentage, count);
    setResults(newResults);
  }, [percentage, count, selectedCandidate]);

  return (
    <div className="election-calculator">
      <div className="election-calculator">
        <p className="description">
          <b>Cel kalkulatora:</b> Pokazuje, jak wyniki kandydatów w drugiej turze różnią się od tego, czego można się było spodziewać na podstawie sondaży.
          <br />
          <b>Metodologia:</b> Do wyników kandydatów z pierwszej tury dodałem przewidywane przepływy głosów od pozostałych kandydatów (na podstawie sondaży). Otrzymany w ten sposób wynik porównałem z rzeczywistym wynikiem drugiej tury.
        </p>
        <div className="candidates">
          <div
            className={`candidate ${selectedCandidate === 'trzaskowski' ? 'selected' : ''}`}
            onClick={() => setSelectedCandidate('trzaskowski')}
          >
            <img src={process.env.PUBLIC_URL + '/trzaskowski.jpg'} alt="Rafał Trzaskowski" />
            <h3>Rafał Trzaskowski</h3>
          </div>
          <div
            className={`candidate ${selectedCandidate === 'nawrocki' ? 'selected' : ''}`}
            onClick={() => setSelectedCandidate('nawrocki')}
          >
            <img src={process.env.PUBLIC_URL + '/nawrocki.webp'} alt="Karol Nawrocki" />
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
              onChange={(e) => setPercentage(e.target.value)}
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
              onChange={(e) => setCount(e.target.value)}
              min="0"
            />
          </div>
          <div className="input-group sort-switch">
            <label>Sortuj wyniki:</label>
            <button
              type="button"
              className={sortBy === 'percentage' ? 'active' : ''}
              onClick={() => setSortBy('percentage')}
            >
              %
            </button>
            <button
              type="button"
              className={sortBy === 'count' ? 'active' : ''}
              onClick={() => setSortBy('count')}
            >
              głosy
            </button>
          </div>
        </div>

        <div className="results">
          <h2>Różnica w poparciu między pierwszą a drugą turą z podziałem na komisje</h2>
          <div className="disclaimer">
            <p><strong>Uwaga:</strong> Obliczenia uwzględniają głosy z pierwszej tury, które zostały rozdzielone między dwóch kandydatów w drugiej turze na podstawie sondaży. Stąd widać liczby niecałkowite.</p>
          </div>
          <p>Łączna różnica w <b>głosach na korzyść kandydata</b>: {results.total.toFixed(1)}</p>
          <div className="districts">
            {Object.entries(results.districts)
              .sort(([, a], [, b]) => sortBy === 'percentage' ? b.percentage - a.percentage : b.count - a.count)
              .map(([district, data]) => (
                <div key={district} className="district">
                  <h3>Nr komisji: {district}</h3>
                  <p>Różnica procentowa: {data.percentage.toFixed(2)}%</p>
                  <p>Różnica w głosach: {data.count.toFixed(1)}</p>
                </div>
              ))}
          </div>
        </div>

        <div style={{ marginTop: '2em', textAlign: 'center' }}>
          <a href="https://github.com/radekwielonski/wybory2025/blob/main/HOW_I_MADE_INPUT_FILE.md" target="_blank" rel="noopener noreferrer">
            Jak powstał plik wejściowy? (pełny opis)
          </a>
        </div>
      </div>
    </div>
  );
};

export default ElectionCalculator; 