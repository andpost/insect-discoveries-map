export class UpdateInfo {
    lastUpdate : string;
    newFeatures : string;
    speciesNew : string;
    speciesChanges : string;

    speciesNewList = new Array();
    speciesChangesList = new Array();

    constructor(lastUpdate : string, newFeatures : string, speciesNew : string, speciesChanges : string) {
        this.lastUpdate = lastUpdate;
        this.newFeatures = newFeatures;
        this.speciesNew = speciesNew;
        this.speciesChanges = speciesChanges;

        if (this.speciesNew != null) {
          this.speciesNew.split(",").forEach(species => this.speciesNewList.push(species.trim()));
        }
      
        if (this.speciesChanges != null) {
          this.speciesChanges.split(",").forEach(species => this.speciesChangesList.push(species.trim()));
        }
    }
}