import {ChangeDetectionStrategy, Component, ElementRef, ViewChild} from '@angular/core';
import {SyncService} from '../sync/sync.service';
import {SnackService} from '../../core/snack/snack.service';
import {AppDataComplete} from '../sync/sync.model';
import {OldDataExport} from '../migrate/migrate.model';
import {MigrateService} from '../migrate/migrate.service';
import {download} from '../../util/download';

@Component({
  selector: 'file-imex',
  templateUrl: './file-imex.component.html',
  styleUrls: ['./file-imex.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileImexComponent {
  @ViewChild('fileInput', {static: true}) fileInputRef: ElementRef;

  constructor(
    private _syncService: SyncService,
    private _migrateService: MigrateService,
    private _snackService: SnackService,
  ) {
  }

  async handleFileInput(ev: any) {
    const files = ev.target.files;
    const file = files.item(0);
    const reader = new FileReader();
    reader.onload = async () => {
      const textData = reader.result;
      console.log(textData);
      let data: AppDataComplete;
      let oldData: OldDataExport;
      try {
        data = oldData = JSON.parse(textData.toString());
      } catch (e) {
        this._snackService.open({type: 'ERROR', msg: 'Import failed: Invalid JSON'});
      }

      if (oldData.config && Array.isArray(oldData.tasks)) {
        await this._migrateService.migrateData(oldData);
      } else {
        await this._syncService.loadCompleteSyncData(data);
      }

      // clear input
      this.fileInputRef.nativeElement.value = '';
      this.fileInputRef.nativeElement.type = 'text';
      this.fileInputRef.nativeElement.type = 'file';
    };
    reader.readAsText(file);
  }

  async downloadBackup() {
    const data = await this._syncService.getCompleteSyncData();
    download('super-productivity-backup.json', JSON.stringify(data));
  }
}
