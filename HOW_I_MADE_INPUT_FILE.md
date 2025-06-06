# Jak powstał plik wejściowy?

Plik `wyniki.json` powstał na podstawie oficjalnych protokołów wyborczych pobranych ze strony [https://www.wybory.gov.pl/prezydent2025](https://www.wybory.gov.pl/prezydent2025).

Dane z pierwszej i drugiej tury zostały przetworzone w następujący sposób (Python):

```python
pierwsza_tura_df = pd.read_csv("protokoly_po_obwodach_utf8.csv", delimiter=";")
druga_tura_df = pd.read_csv(
    "protokoly_po_obwodach_w_drugiej_turze_utf8.csv", delimiter=";"
)

druga_tura_dict = {}
pierwsza_tura_dict = {}

for index, row in druga_tura_df.iterrows():
    wszystkie_glosy = try_int(
        row["Liczba głosów ważnych oddanych łącznie na obu kandydatów (z kart ważnych)"]
    )
    if wszystkie_glosy == 0:
        continue

    nawrocki_glosy = try_int(row["NAWROCKI Karol Tadeusz"])
    trzaskowski_glosy = try_int(row["TRZASKOWSKI Rafał Kazimierz"])

    druga_tura_dict[f"{row['Nr komisji']}, {row['Gmina']}"] = {
        "nawrocki": {
            "procenty": nawrocki_glosy * 100 / wszystkie_glosy,
            "liczba": nawrocki_glosy,
        },
        "trzaskowski": {
            "procenty": trzaskowski_glosy * 100 / wszystkie_glosy,
            "liczba": trzaskowski_glosy,
        },
    }

for index, row in pierwsza_tura_df.iterrows():
    wszystkie_glosy = try_int(
        row[
            "Liczba głosów ważnych oddanych łącznie na wszystkich kandydatów (z kart ważnych)"
        ]
    )
    if wszystkie_glosy == 0:
        continue
    nawrocki_glosy = (
        try_int(row["NAWROCKI Karol Tadeusz"])
        + 0.881 * try_int(row["MENTZEN Sławomir Jerzy"])
        + 0.925 * try_int(row["BRAUN Grzegorz Michał"])
        + 0.162 * try_int(row["ZANDBERG Adrian Tadeusz"])
        + 0.098 * try_int(row["BIEJAT Magdalena Agnieszka"])
        + 0.189 * try_int(row["SENYSZYN Joanna"])
        + 0.138 * try_int(row["HOŁOWNIA Szymon Franciszek"])
        + 0.654 * try_int(row["WOCH Marek Marian"])
        + 0.512 * try_int(row["STANOWSKI Krzysztof Jakub"])
        + 0.729 * try_int(row["MACIAK Maciej"])
        + 0.903 * try_int(row["JAKUBIAK Marek"])
        + 0.673 * try_int(row["BARTOSZEWICZ Artur"])
    )
    trzaskowski_glosy = (
        try_int(row["TRZASKOWSKI Rafał Kazimierz"])
        + 0.838 * try_int(row["ZANDBERG Adrian Tadeusz"])
        + 0.902 * try_int(row["BIEJAT Magdalena Agnieszka"])
        + 0.811 * try_int(row["SENYSZYN Joanna"])
        + 0.862 * try_int(row["HOŁOWNIA Szymon Franciszek"])
        + 0.119 * try_int(row["MENTZEN Sławomir Jerzy"])
        + 0.075 * try_int(row["BRAUN Grzegorz Michał"])
        + 0.346 * try_int(row["WOCH Marek Marian"])
        + 0.488 * try_int(row["STANOWSKI Krzysztof Jakub"])
        + 0.0271 * try_int(row["MACIAK Maciej"])
        + 0.097 * try_int(row["JAKUBIAK Marek"])
        + 0.327 * try_int(row["BARTOSZEWICZ Artur"])
    )
    pierwsza_tura_dict[f"{row['Nr komisji']}, {row['Gmina']}"] = {
        "nawrocki": {
            "procenty": nawrocki_glosy * 100 / wszystkie_glosy,
            "liczba": nawrocki_glosy,
        },
        "trzaskowski": {
            "procenty": trzaskowski_glosy * 100 / wszystkie_glosy,
            "liczba": trzaskowski_glosy,
        },
    }
``` 