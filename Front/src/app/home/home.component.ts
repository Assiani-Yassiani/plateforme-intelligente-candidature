import { Component, OnInit, Renderer2, ElementRef, OnDestroy } from '@angular/core';
import { SharedService } from '../_shared/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private renderer: Renderer2, private el: ElementRef, private sharedService: SharedService) { }

  ngOnInit(): void {
    console.log("HomeComponent initialized");
    this.sharedService.setAffichageNavbare(false);

    // Créez un élément script
    const script = this.renderer.createElement('script');

    // Ajoutez le contenu du script
    script.text = `
      const chiffres = document.querySelectorAll('.chiffres');
      let started = false;
      window.addEventListener('scroll', () => {
          if (window.scrollY > 800) {
              if (!started) {
                  console.log('ça marche');
                  chiffres.forEach(chiffre => {
                      let v = 0;
                      let b = parseInt(chiffre.dataset.value) / 50;
                      let counter = setInterval(() => {
                          v += b; 
                          chiffre.textContent = '+' + Math.floor(v);
                          if (Math.floor(v) >= chiffre.dataset.value) {
                              clearInterval(counter);
                          }
                      }, 40);
                  });
              }
              started = true;
          }
      });
    `;

    // Insérez le script dans l'élément du composant
    this.renderer.appendChild(this.el.nativeElement, script);
  }

  ngOnDestroy(): void {
    this.sharedService.setAffichageNavbare(true);
  }
}
