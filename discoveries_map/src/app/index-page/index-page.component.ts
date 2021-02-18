import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment';
import { DataService } from '../app.dataservice';
import { Art } from "../art-entity";
import { UpdateInfo } from "../updateinfo-entity";

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {

  anzahlArten : number;
  anzahlOrdnungen : number;
  anzahlBeobachtungen : number;
  anzahlArtenMitFotos : number;
  anzahlFotos : number;
  artenProOrdnung : Map<string, number> = new Map();

  updateInfo : UpdateInfo;

  chartType = 'PieChart';
  chartTitle = "# Arten pro Insektenordnung";
  chartData = [];
  chartColumnNames = ['Ordnung', 'Anzahl in %'];
  chartWidth = 550;
  chartHeight = 400;
  chartOptions = {
                   'pieHole' : 0.4
                 };

  constructor(private dataService: DataService) { 
    this.dataService.getUpdateInfoData(environment.updateInfoDataSource).subscribe((data : UpdateInfo) => this.setUpdateInfoData(data)); 
    this.loadDataAndCreateStatistics();
  }

  ngOnInit() {
  }

  setUpdateInfoData(updateInfo : UpdateInfo) {
    this.updateInfo = new UpdateInfo(updateInfo.lastUpdate, updateInfo.newFeatures, updateInfo.speciesNew, updateInfo.speciesChanges);
  }

  loadDataAndCreateStatistics() {
    this.dataService.getArten().subscribe((data: Art[]) => this.createStatistics(data));
  }

  createStatistics(arten : Art[]) {
    this.anzahlArten = arten.length;
    this.anzahlBeobachtungen = 0;
    this.anzahlFotos = 0;
    this.anzahlArtenMitFotos = 0;

    var ordnungList = [];

    arten.forEach(art => {
      if (!this.artenProOrdnung.has(art.ordnung)) {
        this.artenProOrdnung.set(art.ordnung, 0);
      }

      var anzahlArtenProOrdnung = this.artenProOrdnung.get(art.ordnung);
      anzahlArtenProOrdnung ++;
      this.artenProOrdnung.set(art.ordnung, anzahlArtenProOrdnung);

      if (art.beobachtungen != null) {
        this.anzahlBeobachtungen += art.beobachtungen.length;

        var hasFotos = false;

        art.beobachtungen.forEach(beobachtung => {
          if (beobachtung.fotos != null) {
            hasFotos = true;
            this.anzahlFotos += beobachtung.fotos.length;
          }
        });

        if (hasFotos) {
          this.anzahlArtenMitFotos ++;
        }
      }
      if (!ordnungList.includes(art.ordnung)) {
        ordnungList.push(art.ordnung);
      }
    });

    this.anzahlOrdnungen = ordnungList.length;

    this.artenProOrdnung.forEach((anzahl: number, ordnung: string) => {
      this.chartData.push([ordnung, anzahl]);
    });

    /*
     * Reassign the instance to trigger reloading after data changed.
     *
     * https://github.com/FERNman/angular-google-charts/issues/39
     */
    this.chartData = Object.assign([], this.chartData)

  }

}
