import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Database, ref, child, object, push, update, remove} from '@angular/fire/database';
import { Observable, Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  // https://firebase.google.com/docs/database/web/read-and-write?hl=fr#web-modular-api_5

  private $appartements! : Subscription;
  public appartements : Subject<any[]> = new Subject<any[]>();
  private _appartements : any[] = [];

  private $appartement! : Subscription;
  public appartement : Subject<any> = new Subject<any>();
  private _appartement : any = {};



  constructor(private db : Database, private router : Router) {




  }

  disconnect() : void {
    if(this.$appartements != null){
      this.$appartements.unsubscribe();
    }
  }

  getAll() : void {

    if(this.$appartements != null){
      this.$appartements.unsubscribe();
    }

    this.$appartements = object(ref(this.db, '/appartements')).subscribe((appartements : any)=>{
      var data = appartements.snapshot.val();
      var keys = Object.keys(data);
      this._appartements = [];
      keys.forEach((k : string)=>{
        this._appartements.push(data[k]);
      });
      this.appartements.next(this._appartements);
    });

  }


  create() : void {
    var newAppart : any = {
      id : "",
      origine : "",
      ville : "",
      nom : "Nouvel appartement...",
      lien : "",
      image : "",
      description : "",
      surface : 1,
      pieces : 1,
      ascenseur : '',
      classeE : "",
      classeGES : "",
      prix : 0,
      honoraires : 0,
      prixFinal: 0,
      charges : {
        copro : 0,
        energie : 0,
        annuelles : 0
      },
      depenses : {
        list: {},
        total : 0
      },
      credit : {
        apport : 0,
        taux : 0,
        duree: 0,
        mensualites : 0,
        interets : 0,
        total : 0
      },
      loyer : 0,
      rendement : 0.04,
      latlng : {lat : 0, lng : 0}

    };
    newAppart.id = push(child(ref(this.db), 'appartements')).key;
    update(ref(this.db , 'appartements/' + newAppart.id), newAppart).then(()=>{
      console.log('Appartement : ' + newAppart.id + ' ajouté.' );
    }).catch((err : any)=>{
      console.log(err)
    });
  }

  getOne(id : string) : void {
    if(this.$appartement != null){
      this.$appartement.unsubscribe();
    }

    this.$appartement = object(ref(this.db, '/appartements/'+id)).subscribe((appartement : any)=>{
      var data = appartement.snapshot.val();
      this._appartement = data;
      if(this._appartement.depenses.list == null){
        this._appartement.depenses.list = {};
      }
      this.appartement.next(this._appartement);
    });
  }


  save() : void {
    if(this._appartement.id != ''){
      update(ref(this.db , 'appartements/' + this._appartement.id), this._appartement).then(()=>{
        console.log('Appartement : ' + this._appartement.id + ' modifié.' );
        alert('Enregistrement réussi.');
      }).catch((err : any)=>{
        console.log(err)
      });
    } else {
      console.log("Pas d'appartement sélectionné.");
    }

  }

  remove(id : string) : void {

    if (confirm("Attention, cette action est irréversible. Voulez-vous continuer ?")) {
      if(id != '' && id != null){

        try {
          this.$appartement.unsubscribe();
        } catch (error) {

        }

        remove(ref(this.db , 'appartements/' + id)).then(()=>{
          console.log('Appartement : ' + id + ' supprimé.' );
          alert("L'appartement a bien été supprimé.");
          this.router.navigate(['/pageune']);
        }).catch((err : any)=>{
          console.log(err)
        });

      } else {
        console.log("Pas d'appartement sélectionné.");
      }
    }

  }

}
