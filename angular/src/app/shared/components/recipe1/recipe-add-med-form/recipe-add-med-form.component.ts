import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NgModel } from '@angular/forms';
import { CacheService } from 'src/app/shared/services/cache.service';
import { CatalogService } from 'src/app/shared/services/catalog.service';

@Component({
  selector: 'app-recipe-add-med-form',
  templateUrl: './recipe-add-med-form.component.html',
  styleUrls: ['./recipe-add-med-form.component.css'],
})
export class RecipeAddMedFormComponent implements AfterViewInit {
  selectedMedicine: string = '';

  @ViewChild('inputselectMedInput') inputselectMedInput!: NgModel;
  @ViewChild('inputmorning') inputmorning!: NgModel;
  @ViewChild('inputadditionalInfo') inputadditionalInfo!: NgModel;
  @ViewChild('inputmidday') inputmidday!: NgModel;
  @ViewChild('inputevening') inputevening!: NgModel;
  @Output('nestedFormValues') customEvent = new EventEmitter<object>();

  currentmedicine: any = '';
  filteredResults: any;
  searchTerm: any;
  showDropdown: boolean = false;
  constructor(
    private Renderer2: Renderer2,
    private ElementRef: ElementRef,
    public CacheService: CacheService,
    private catalogService: CatalogService
  ) {
    this.filteredResults = this.results;
  }
  clearAllFields() {}

  emit() {
    this.currentmedicine = {
      med: this.selectedMedicine,
      morning: this.inputmorning.value,
      midday: this.inputmidday.value,
      evening: this.inputevening.value,
      additionalInfo: this.inputadditionalInfo.value,
    };
    this.customEvent.emit(this.currentmedicine);
  }
  ngAfterViewInit() {
    this.setStyles();
    // this.medicamentsForSearch();
  }
  searchHandler(seacrchWord: any) {
    console.log(seacrchWord.value);
  }
  setStyles() {
    this.Renderer2.setStyle(this.ElementRef.nativeElement, 'display', 'flex');
    this.Renderer2.setStyle(
      this.ElementRef.nativeElement,
      'justify-content',
      'center'
    );
  }

  results = [
    { medicament: 'Bulgaria', id: 1 },
    { medicament: 'Belgium', id: 2 },
    { medicament: 'USA', id: 3 },
    { medicament: 'Russia', id: 4 },
    { medicament: 'China', id: 5 },
  ];

  filterResults(): void {
    this.filteredResults = this.results.filter(
      (res) =>
        res.medicament &&
        res.medicament.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.showDropdown = true;
  }

  selectOption(option: any): void {
    this.searchTerm = option.medicament;
    this.showDropdown = false;
    console.log('id', option.id);
  }

  // medicamentsForSearch() {
  //   return this.catalogService.getMedicamentsForSearch().subscribe(
  //     (res) => {
  //       res = this.results;
  //       console.log('res', res);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }
}
