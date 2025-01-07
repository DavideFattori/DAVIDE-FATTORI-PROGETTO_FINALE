# Proposta di Consegna

Rimpiazza questo file con i tuoi elementi del progetto, allegando questo file nel tuo repo online.

## Descrizione

Questa applicazione è un catalogo di videogiochi, nel quale gli utenti non registrati e/o loggati possono scorrere nei vari videogiochi attraverso le apposite pagine, vedere nel dettaglio i vari videogiochi ed i relativi commenti lasciati dagli altri utenti in tempo reale. Un utente loggato può accedere alla propria pagina del profilo per vedere le sue informazioni e modificarle, compresa un'immagine del profilo personalizzata, può aggiungere i vari giochi nella sua lista dei preferiti (ed eventualmente rimuoverli) e lasciare dei commenti sotto ai vari giochi. La lista dei preferiti e dei giochi commentati dall'utente sono consultabili nella propria pagina del profilo assieme agli altri dettagli.



## API

API utilizzata: https://api.rawg.io/docs/
BAAS utilizzato: supabase




## Stile

Come soluzione di stile è stato utilizzato Bootstrap v5.3




## Pagine

1. Pagina 1 - HomePage con la lista degli ultimi giochi aggiunti alla pagina
2. Pagina 2 - Pagina della lista dei giochi filtrati per categoria
3. Pagina 3 - Pagina della lista dei giochi filtrati per piattaforma
4. Pagina 4 - Pagina della lista dei giochi filtrati per nome cercato tramite barra di ricerca nella navbar
5. Pagina 5 - Pagina di dettaglio del gioco
6. Pagina 6 - Pagina di registrazione dell'utente
7. Pagina 7 - Pagina di login dell'utente
8. Pagina 8 - Pagina del profilo dell'utente
9. Pagina 9 - Pagina di modifica del profilo dell'utente




## User Interactions

* Lista di interazioni che utenti autenticati e non posso fare nell'applicazione.

1. L'utente non autenticato può scrollare sui giochi in piattaforma
2. L'utente non autenticato può filtrare la lista dei giochi in base al genere
3. L'utente non autenticato può filtrare la lista dei giochi in base alla piattaforma
4. L'utente non autenticato può filtrare per nome del gioco
5. L'utente non autenticato può vedere la vista di dettaglio dei giochi
6. L'utente non autenticato può vedere i commenti aggiornati in tempo reale dei giochi
7. L'utente non autenticato può registrarsi con email e password in piattaforma

8. L'utente auteticato può aggiungere i giochi alla sua lista dei preferiti
9. L'utente auteticato può lasciare dei commenti ai giochi e vedere la lista dei giochi commentati nella sua pagina del profilo
10. L'utente auteticato può accedere alla sua pagina del profilo
11. L'utente auteticato può modificare e aggiungere le informazioni del suo profilo





## Context

Il contesto condivide i dati della sessione dell'utente a tutte le pagine, così possono essere consultati in tutte le pagine per le logiche delle interazioni basate sul fatto che l'utente sia loggato o meno





## Deployment

gamesarchive-liart.vercel.app
