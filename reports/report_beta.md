# Info o projekte:
- Meno a priezvisko: Maximilian Martin Krošlák
- Názov projektu: Systém na hodnotenie reštaurácií
- Link na repozitár: https://github.com/Maax02/System-na-hodnotenie-restauracii
- Link na verejnú inštanciu projektu: https://system-na-hodnotenie-restauracii-1.onrender.com/restaurants

# Info o reportovanej verzii:
- Tag: beta

# Info k testovaniu:     
<!-- Uveďte credentials testovacích používateľov, ak sú potrebné na otestovanie Vašej bety. Uveďte aj akékoľvek iné relevantné informácie k testovaniu. Tieto informácie môžete alternatívne poslať aj e-mailom spolu s odovzdaním bety (napr. ak nechcete testovacie credentials zverejňovať). -->
- V signUp si môžte vytvoriť vlastný účet. Meno a email nemusí byť vaše skutočné.
- Následne sa v LogIn prihlásite. (ak registrácia prebehla úspešne)
- Ak si nechcete vytvoriť vlastný účet, môžte sa prihlásiť pomocou tohoto účtu:
- meno: testUser
- heslo: test


# Postup, ako rozbehať vývojové prostredie 
<!-- Postup pre lokálne rozbehanie vývojového prostredia (kto si trúfa, kľudne ako Docker file / Docker compose) -->
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
<!-- V bodoch spísať, ktoré funcionality sú už implementované, rozpracované, neimplementované vôbec -->
- Implementované:
- zaregistrovanie používateľa
- prihlásenie používateľa
- písanie recenzií
- vyhľadávanie reštaurácie podľa mena

- Neimplementované:
- používateľ nemôže zmazať svoju recenziu (v šécifikácii ani o tom nepíšem, ale bolo by to dobré implementovať)
- admin zatiaľ nemá žiadnu moc (neodlišuje sa od normálneho používateľa vo funkcionalite)
- filtrovanie vyhľadávania reštaurácií (zoradenie od najhoršie hodnotených, ...)

# Časový plán:
<!-- Akutalizovaný časový plán na zvyšné obodobie do odovzdania finálnej verzie -->
- week 10:
- pridat funkcionalitu adminovi
- pridat moznost pouzivatelovi vymazat svoje recenzie
- filtre na vyhladavanie


- week 11:
- podla feedbacku
- css podl apotreby
- vylepsenie user experiencu

# Problémy:
<!-- Popísať akékoľvek problémy, s ktorými ste sa stretli. Ak neboli žiadne, explicitne to uveďte. -->
- deployment robil blbosti


