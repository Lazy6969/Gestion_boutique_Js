// Définition des prix des produits
const prixProduits = {
    "gateau": 2000,
    "chocolat": 1000,
    "glace": 500,
    "riz_cantonnais": 3000,
    "riz_au_zebus": 4000,
    "riz_legumes": 2000,
    "coca": 1500,
    "jus": 500,
    "yaourt": 600
};

const bouton = document.getElementById("btn");
const select = document.getElementById("sel");
const qteInput = document.getElementById("qte");
const affichage = document.getElementById("afficher");
const resetBtn = document.getElementById("reset-btn");

// Initialisation du panier
let panier = [];

bouton.addEventListener("click", (e) => {
    // Récupération des valeurs
    const produitKey = select.value;
    const produitNom = select.options[select.selectedIndex].text;
    const quantite = parseInt(qteInput.value) || 0;
    const prix = prixProduits[produitKey] || 0;

    if (quantite <= 0) {
        alert("Veuillez entrer une quantité valide.");
        return;
    }

    // Ajout au panier (si le produit existe déjà, on ajoute la quantité)
    const produitExistant = panier.find(item => item.key === produitKey);
    
    if (produitExistant) {
        produitExistant.quantite += quantite;
    } else {
        panier.push({
            key: produitKey,
            nom: produitNom,
            quantite: quantite,
            prix: prix
        });
    }

    afficherPanier();
});

resetBtn.addEventListener("click", () => {
    panier = []; // Vider le tableau du panier
    affichage.innerHTML = "<p>Le panier est vide.</p>"; // Remettre le message par défaut
    select.selectedIndex = 0; // Remettre le sélecteur sur le premier produit
    qteInput.value = 1; // Remettre la quantité à 1
});

function afficherPanier() {
    let html = '<table class="ticket-table"><thead><tr><th>Produit</th><th>Qté</th><th>P.U</th><th>Total</th></tr></thead><tbody>';
    let totalGeneral = 0;

    panier.forEach(item => {
        const totalLigne = item.prix * item.quantite;
        totalGeneral += totalLigne;
        html += `<tr>
                    <td>${item.nom}</td>
                    <td>${item.quantite}</td>
                    <td>${item.prix} Ar</td>
                    <td>${totalLigne} Ar</td>
                 </tr>`;
    });

    html += `</tbody></table><div class="total-general">Total à payer : ${totalGeneral} Ar</div>`;
    affichage.innerHTML = html;
}
