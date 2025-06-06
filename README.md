# Kalkulator Wyborczy 2025

Kalkulator ma na celu pokazanie komisji wyborczych, w których głosy z pierwszych tur odbiegają od głosów z drugich tur. Pozwala analizować różnice w poparciu dla wybranego kandydata pomiędzy pierwszą a drugą turą wyborów prezydenckich.

## Funkcje
- Wybór kandydata (Rafał Trzaskowski lub Karol Nawrocki)
- Ustawienie minimalnej różnicy procentowej i liczbowej głosów
- Lista komisji wyborczych spełniających wybrane kryteria
- Wyniki posortowane według największej różnicy procentowej
- Responsywny interfejs, dostosowany do urządzeń mobilnych

## Jak korzystać
1. Wybierz kandydata klikając na jego zdjęcie.
2. Ustaw minimalną różnicę procentową i/lub liczbową głosów.
3. Wyniki zostaną automatycznie zaktualizowane.

## Disclaimer
Obliczenia uwzględniają głosy z pierwszej tury, które zostały rozdzielone między dwóch kandydatów w drugiej turze na podstawie sondaży. Stąd widać liczby niecałkowite.

## Demo
Aplikacja jest dostępna online pod adresem:
https://radekwielonski.github.io/wybory2025

## Uruchomienie lokalne

```bash
npm install
npm start
```

Aplikacja będzie dostępna pod adresem http://localhost:3000

## Deployment na GitHub Pages

```bash
npm run deploy
```

Aplikacja zostanie zbudowana i opublikowana na GitHub Pages na branchu `gh-pages`.

---

Projekt oparty na [Create React App](https://github.com/facebook/create-react-app).
