# Info o projekte:
- Meno a priezvisko: Maximilian Martin Krošlák
- Názov projektu: Systém na hodnotenie reštaurácií
- Link na repozitár: https://github.com/Maax02/System-na-hodnotenie-restauracii
- Link na verejnú inštanciu projektu: https://system-na-hodnotenie-restauracii-1.onrender.com/restaurants

# Info o reportovanej verzii:
- Tag: final

# Info k testovaniu:     
- V signUp si môžte vytvoriť vlastný účet. Meno a email nemusí byť vaše skutočné.
- Následne sa v "Prihlásiť sa" prihlásite. (ak registrácia prebehla úspešne)
- Ak si nechcete vytvoriť vlastný účet, môžte sa prihlásiť pomocou tohoto účtu:
- meno: admin1
- heslo: admin

# Postup, ako rozbehať vývojové prostredie 
- naklonujete si repozitár z github
- v postgres si vytvoríte databázu
- v my-app-be je schéma databázy, ktorú použite, sú tam aj niektoré reštaurácie
- v my-app-be si vytvorte .env súbor s takouto štruktúrov:
        - PORT=3000
        - DB_USER=<user_name>
        - DB_PASSWORD=<db_password>
        - DB_HOST="localhost"
        - DB_PORT=5432
        - DB_NAME=<database_name>
        - SESSION_SECRET=<some_random_string>

- v app-app-be a npm-app-fe v príkazovom riadku spustíte príkaz: npm install
- nasledne v nich spustíte: npm run dev
- splikácia sa vám spustí na localhostovi
- frontend: http://localhost:5173/
- backend: http://localhost:3000/

# Stav implementácie:
- používateľ si dokáže vytvoriť vlastný účet a následne sa prihlásiť
- po prihlásení sa dostane na hlavnú stránku, kde nájde reštaurácie, ktorých hodnotenia si môže pozrieť alebo napísať svoje vlastné a taktiež môže priložiť jeden obrázok
- na napísanie recenzie musí byť užívateľ prihlásený
- neprihlásený užívateľ si môže iba pozerať recenzie, nemôže ich písať
- na stránke "Účet" si prihlásený užívateľ môže pozrieť svoj profil. Nájde tam svoje, meno email a napísané recenzie
- admin tam ešte k tomu nájde možnosť vyhľadať uživateľa a buď ho vymazať alebo mu prideliť právomoci admina
- následne dokáže vytvoriť novú reštauráciu, ale aj reštaurácie vymazať

# Retrospektíva:
- niektoré časti kódu sú zbytočne komplikované a zle čitateľné
- pravdepodobne by som si viac premyslel schému databázy, pretože som ju musel viackrát meniť
- lepšie oddeliť kód, viac komponentov, rôzna funkcionalita v rôznych komponentoch



