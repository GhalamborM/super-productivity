import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { GoogleApiService } from '../google-api.service';
import { ConfigService } from '../../config/config.service';
import { GoogleDriveSyncService } from '../google-drive-sync.service';
import { SnackService } from '../../../core/snack/snack.service';
import { GoogleDriveSyncConfig } from '../../config/config.model';
import { Subscription } from 'rxjs';
import { expandFadeAnimation } from '../../../ui/animations/expand.ani';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'google-sync-cfg',
  templateUrl: './google-sync-cfg.component.html',
  styleUrls: ['./google-sync-cfg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [expandFadeAnimation]
})
export class GoogleSyncCfgComponent implements OnInit, OnDestroy {
  tmpSyncFile: any;
  cfg: GoogleDriveSyncConfig;
  loginPromise: Promise<any>;

  @ViewChild('formRef', {static: true}) formRef: FormGroup;

  @Output() save = new EventEmitter<any>();

  private _subs = new Subscription();

  constructor(
    public readonly googleApiService: GoogleApiService,
    private readonly googleDriveSyncService: GoogleDriveSyncService,
    private readonly _configService: ConfigService,
    private readonly _snackService: SnackService,
    private readonly _cd: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this._subs.add(this._configService.cfg$.subscribe((cfg) => {
      this.cfg = cfg.googleDriveSync;
      this.tmpSyncFile = cfg.googleDriveSync.syncFileName;
      this._cd.detectChanges();
    }));
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }

  submit() {
    if (this.formRef.valid) {
      this.save.emit({
        sectionKey: 'googleDriveSync',
        config: this.cfg,
      });
    } else {
      Object.keys(this.formRef.controls)
        .forEach(fieldName =>
          this.formRef.controls[fieldName].markAsDirty()
        );
    }
  }

  saveToGoogleDrive() {
    this.googleDriveSyncService.saveTo();
  }

  loadFromGoogleDrive() {
    this.googleDriveSyncService.loadFrom();
  }

  login() {
    this.loginPromise = this.googleApiService.login();
  }

  logout() {
    this.googleApiService.logout();
  }

  changeSyncFileName(newSyncFile) {
    this.googleDriveSyncService.changeSyncFileName(newSyncFile);
  }
}
