document.addEventListener("DOMContentLoaded", function () {
    const regelsBtn = document.getElementById("regelsBtn");
    const regelsPopup = document.getElementById("regelsPopup");
    const sluitRegelsBtn = document.getElementById("sluitRegelsBtn");
    const startBtn = document.getElementById("startBtn");
    const buttonContainer = document.getElementById("buttonContainer");
    const letterDisplay = document.getElementById("letterDisplay");
    const cd3s = document.getElementById("cd3s");
    const vraagDisplay = document.getElementById("vraagDisplay");
    const cd30s = document.getElementById("cd30s");
    const volgendeVraagBtn = document.getElementById("volgendeVraagBtn");
    const eindText = document.getElementById("eindText");
    const gaDoorBtn = document.getElementById("gaDoorBtn");

    // Element voor de gif die toegevoegd wordt bij einde ronde
    const imageContainer = document.createElement("div");
    imageContainer.style.textAlign = "center"; // Zorg ervoor dat de gif gecentreerd is
    document.body.appendChild(imageContainer); // Voeg de container toe aan de body van de pagina

    let cd30sTimer, cd3sTimer;
    let isCooldown = false;

    // Regels popup openen/sluiten
    regelsBtn.addEventListener("click", function () {
        regelsPopup.style.display = "block";
    });

    sluitRegelsBtn.addEventListener("click", function () {
        regelsPopup.style.display = "none";
    });

    // Start het spel
    startBtn.addEventListener("click", function () {
        buttonContainer.style.display = "none";
        startSpel();
    });

    function startSpel() {
        resetUI();
        const letter = getRandomLetter();
        letterDisplay.innerText = `Jouw letter: ${letter}`;
        
        let countdown = 3;
        cd3s.innerText = `Start over: ${countdown}...`;

        cd3sTimer = setInterval(() => {
            countdown--;
            cd3s.innerText = `Start over: ${countdown}...`;
            if (countdown === 0) {
                clearInterval(cd3sTimer);
                cd3s.innerText = "";
                letterDisplay.innerText = "";
                startVraag();
            }
        }, 1000);
    }

    function startVraag() {
        vraagDisplay.innerText = getRandomVraag();
        volgendeVraagBtn.style.display = "inline-block";
        startCD30S();
    }

    function startCD30S() {
        clearInterval(cd30sTimer);
        let countdown = 30;
        cd30s.innerText = `${countdown} seconden over...`;

        // Reset de kleur van de button in het begin
        volgendeVraagBtn.style.backgroundColor = ""; // Reset naar de standaardkleur

        cd30sTimer = setInterval(() => {
            countdown--;
            cd30s.innerText = `${countdown} seconden over...`;

            // Verander de kleur van de button afhankelijk van de tijd
            if (countdown === 17) {
                volgendeVraagBtn.style.backgroundColor = "orange"; // Oranje bij 17 seconden
            } else if (countdown === 7) {
                volgendeVraagBtn.style.backgroundColor = "red"; // Rood bij 7 seconden
            }

            if (countdown === 0) {
                clearInterval(cd30sTimer);
                eindeRonde(); // Je moet deze functie implementeren of aanpassen
            }
        }, 1000);
    }

    function eindeRonde() {
        vraagDisplay.innerText = "";
        cd30s.innerText = "";
        eindText.innerText = "Je hebt het niet gered. Je gaat Jilla!!";
        eindText.style.display = "block";
        volgendeVraagBtn.style.display = "none";
        gaDoorBtn.style.display = "inline-block";

        // Voeg de GIF toe bij einde ronde
        const gif = document.createElement("img");
        gif.src = "images/jilla.gif"; // Zorg ervoor dat je een werkende GIF URL gebruikt
        gif.alt = "Einde Ronde";
        gif.style.width = "200px"; // Verhoog de grootte van de GIF
        gif.style.height = "auto";
        gif.style.marginBottom = "80px"; // Voeg wat ruimte toe onder de GIF om de tekst goed te scheiden
        gif.style.display = "block"; // Zorg ervoor dat het als block wordt weergegeven
        imageContainer.innerHTML = ''; // Verwijder eventuele vorige afbeeldingen
        imageContainer.appendChild(gif);
    }

    // De functie die de vraag verandert en de cooldown start
    volgendeVraagBtn.addEventListener("click", function () {
        if (isCooldown) return;

        vraagDisplay.innerText = getRandomVraag(); // Zorg ervoor dat getRandomVraag() een functie is die een vraag retourneert
        startCD30S();

        isCooldown = true;
        volgendeVraagBtn.style.opacity = "0.5";
        volgendeVraagBtn.disabled = true;

        setTimeout(() => {
            isCooldown = false;
            volgendeVraagBtn.style.opacity = "1";
            volgendeVraagBtn.disabled = false;
        }, 1000);

    });

    gaDoorBtn.addEventListener("click", function () {
        startSpel();

        // Verberg de GIF zodra de volgende vraag wordt gestart
        imageContainer.innerHTML = '';
    });

    function getRandomLetter() {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return alphabet[Math.floor(Math.random() * alphabet.length)];
    }

    function getRandomVraag() {
        const vragen = [
            "Een dier?",
            "Een bekend persoon?",
            "Een film?",
            "Een pokkoe?",
            "Iets wat in een mocro bagga past?",
            "Een stad?",
            "Een land?",
            "Een soort wierie?",
            "Een merk?",
            "Je hebt de wierie goden geblessed, neem dubbele shoetoe!",
            "Je hebt keya van bewaker genakt, je hebt jilla pass!",
            "Je hebt iemand geshanked, je moet jilla!",
            "Switch de route, draai de pot!",
            "Een website?",
            "Een winkel?",
            "Een type vervoer?",
            "Een fortis persoon?",
            "Een korfbalclub?",
            "Een voetbalclub?",
            "Een superheld?",
            "Een automerk?",
            "Een gerecht uit de Nederlandse keuken?",
            "Een gerecht uit de Spaanse keuken?",
            "Een gerecht uit de Iteliaanse keuken?",
            "Een gerecht uit de Duitse keuken?",
            "Een bekend persoon uit de geschiedenis?",
            "Een festival?",
            "Een tv-programma?",
            "Een muziekgenre?",
            "Een app?",
            "Een game?",
            "Een dancemove?",
            "Iets waarop je kan slapen?",
            "Een dier dat voorkomt in Nederland?",
            "Iets wat met het heelal te maken heeft?",
            "Een beroep?",
            "Een youtube kanaal?",
            "Een hobby?",
            "Een stad in europa?",
            "Een feestdag?",
            "Een insect?",
            "Een alcoholisch drankje?",
            "Een politicus?",
            "Een bedrijf in Nederland?",
            "Een gerroe merk?",
            "Een shoppa naam?",
            "Een liedje uit de jaren '90?",
            "Een soort bier?",
            "Een scheldwoord?",
            "Switch it up, vanaf nu alleen maar engels!",
            "Een gameconsole?",
            "Een soort parfum?",
            "Een pretpark?",
            "Een dier in de jungle?",
            "Een beroemde sporter?",
            "Een internet meme?",
            "Een activiteit die je op vakantie doet?",
            "Een plaats in Nederland die bekend is om zijn geschiedenis?",
            "Een populaire serie op Netflix?",
            "Een beroemde uitvinder van de 19e eeuw?",
            "Een beroemd standbeeld?",
            "Een soort kaas?",
            "Een bekende komiek?",
            "Een type bloemen?",
            "Een festival in Nederland?",
            "Een beroemd stripfiguur?"
        
        ];
        return vragen[Math.floor(Math.random() * vragen.length)];
    }

    function resetUI() {
        letterDisplay.innerText = "";
        cd3s.innerText = "";
        vraagDisplay.innerText = "";
        cd30s.innerText = "";
        eindText.innerText = "";
        volgendeVraagBtn.style.display = "none";
        gaDoorBtn.style.display = "none";
        clearInterval(cd30sTimer);
        clearInterval(cd3sTimer);
    }
});
