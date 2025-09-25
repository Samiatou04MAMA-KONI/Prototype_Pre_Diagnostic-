// Script principal pour la gestion des symptômes, résultats et pharmacies

// --- Page symptomes.html : gestion du formulaire ---
if (document.getElementById('symptomeForm')) {
    document.getElementById('symptomeForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Récupérer les cases cochées
        const checked = Array.from(document.querySelectorAll('input[name="symptomes"]:checked')).map(cb => cb.value.trim().toLowerCase());
        // Récupérer les autres symptômes (séparés par virgule)
        const autres = document.getElementById('autres').value
            .split(',')
            .map(s => s.trim().toLowerCase())
            .filter(s => s.length > 0);
        // Fusionner et supprimer les doublons
        const symptomes = Array.from(new Set([...checked, ...autres]));
        // Stocker dans localStorage
        localStorage.setItem('symptomes', JSON.stringify(symptomes));
        // Aller à la page des résultats
        window.location.href = 'resultat.html';
    });
}

// --- Page resultats.html : affichage des maladies probables ---
if (window.location.pathname.endsWith('resultat.html')) {
    // Simuler une base de données locale
    const maladies = [
        { nom: "Paludisme", symptomes: ["fièvre","maux de tête","frissons"], traitement: "Paracétamol, Hydratation" },
        { nom: "Grippe", symptomes: ["fièvre","toux","fatigue"], traitement: "Repos, Vitamine C" },
        { nom: "Typhoïde", symptomes: ["fièvre","douleurs abdominales","nausées"], traitement: "Antibiotique (sous prescription)" }
    ];
    // Récupérer les symptômes choisis
    const symptomes = JSON.parse(localStorage.getItem('symptomes') || '[]');
    const resultatsDiv = document.getElementById('resultats');
    if (symptomes.length === 0) {
        resultatsDiv.innerHTML = "<p>Aucun symptôme sélectionné.</p>";
    } else {
        // Pour chaque maladie, calculer le % de correspondance
        let html = '';
        maladies.forEach(maladie => {
            const nbCommuns = maladie.symptomes.filter(s => symptomes.includes(s)).length;
            const pourcentage = Math.round((nbCommuns / maladie.symptomes.length) * 100);
            if (pourcentage > 0) {
                html += `
                <div class="result-card">
                    <h3>${maladie.nom}</h3>
                    <p><strong>Probabilité :</strong> ${pourcentage}%</p>
                    <p><strong>Traitement suggéré :</strong> ${maladie.traitement}</p>
                </div>
                `;
            }
        });
        if (html === '') {
            html = "<p>Aucune maladie correspondante trouvée. Consultez un professionnel de santé.</p>";
        }
        resultatsDiv.innerHTML = html;
    }
}

// --- Page pharmacies.html : affichage des pharmacies ---
if (window.location.pathname.endsWith('pharmacie.html')) {
    // Liste locale de pharmacies (remplaçable par une base de données/API plus tard)
    const pharmacies = [
        { nom: "Pharmacie Santé Vie", adresse: "Cotonou", tel: "+229 90 00 00 00" },
        { nom: "Pharmacie Centrale", adresse: "Porto-Novo", tel: "+229 91 11 11 11" },
        { nom: "Pharmacie du Marché", adresse: "Parakou", tel: "+229 92 22 22 22" }
    ];
    const listDiv = document.getElementById('pharmacies-list');
    let html = '';
    pharmacies.forEach(pharma => {
        html += `
        <div class="pharmacy-card">
            <h4>${pharma.nom}</h4>
            <p><strong>Adresse :</strong> ${pharma.adresse}</p>
            <p><strong>Téléphone :</strong> ${pharma.tel}</p>
        </div>
        `;
    });
    listDiv.innerHTML = html;
}