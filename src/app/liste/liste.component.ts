import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent implements OnInit, OnDestroy {

  constructor(  public db : FirebaseService){}

  private $map! : Subscription;

  public appartements : any[] = [
    {
      origine : "Leboncoin",
      ville : "strasbourg-67000",
      nom : "Appartement 1 pièce",
      lien : "https://www.leboncoin.fr/offre/ventes_immobilieres/2466052225",
      image : "https://img.leboncoin.fr/api/v1/lbcpb1/images/82/a3/08/82a3081c1bc8127ba34fcb3708560a810f3a1d8c.jpg?rule=ad-large",

      description : "Studio 1 pièce 18 m²  STRASBOURG En plein coeur du Centre Ville, à deux pas de la Place Kléber, des commerces et de toutes les commodités. Nous vous proposons ce STUDIO de 18m², situé en 2ème étage d'une résidence de 1910. L'appartement est composé d'une entrée, d'un coin kitchenette, d'une salle d''eau avec douche et wc, d'une pièce principale ornée de poutres dans l'esprit alsacien. Situation exceptionnelle pour ce STUDIO qui saura vous séduire! [Coordonnées masquées] - [Coordonnées masquées]  Surface : 18 m² Prix du bien : 109000 € Prix du bien hors honoraires : 100000 € Honoraires TTC : 9 % soit 9000 € Honoraires à la charge de l'acquéreur  A propos de la copropriété : Pas de procédure en cours Nombre de lots : 30 Charges prévisionnelles annuelles : 661 € Date de réalisation du diagnostic énergétique : 19/12/2023  Consommation énergie primaire : 408 kWh/m²/an Consommation énergie finale : Non communiqué  Montant estimé des dépenses annuelles d'énergie pour un usage standard : entre 510 € et 730 € par an. Prix moyens des énergies indexés sur l'année 2021 (abonnements compris) Logement à consommation énergétique excessive : classe F",
      surface : 18,
      pieces : 1,
      ascenseur : 'oui',
      classeE : "F",
      classeGES : 'C',
      prix : 100000,
      honoraires : 9000,
      prixFinal: 109000,
      charges : {
        copro : 661,
        energie : 620
      },
      depenseE : 620,
      financement : {
        apport : 60000,
        pret : 120000
      },

      depenses : {
        list: [{intitule : "Achat" , montant : 4000}],
        total : 4000
      },
      recettes : {
        loyer : 421
      }
      ,
      loyer : 600

    }
  ];

  ngOnInit() : void {

    this.db.appartements.subscribe((result : any[])=>{
      // this.appartements.(appartements.snapshot.val());
      this.appartements = result ;
    });;

    this.db.getAll();


  }

  ngOnDestroy() : void {

  }

}
