import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';



@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit{

  public countries: Country[]= [];
  public isLoading: boolean = false;
  public regions: Region[] = ['Africa', 'Europe', 'Americas', 'Asia', 'Oceania'];
  public selectedRegion?: Region;
  

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  constructor(private countriesService: CountriesService) { }

  searchByRegion(term: Region): void {
    this.selectedRegion = term;
    this.isLoading = true;
    this.countriesService.searchRegion(term)
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}
