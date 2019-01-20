import { Action } from '@ngrx/store';

export enum GoogleDriveSyncActionTypes {
  LoadFromGoogleDrive = '[GoogleDriveSync] Load From',
  LoadFromGoogleDriveFlow = '[GoogleDriveSync] Load From Flow',
  LoadFromGoogleDriveSuccess = '[GoogleDriveSync] Load From Success',
  SaveToGoogleDriveFlow = '[GoogleDriveSync] Save To Flow',
  SaveToGoogleDrive = '[GoogleDriveSync] Save To',
  SaveToGoogleDriveSuccess = '[GoogleDriveSync] Save To Success',
  ChangeSyncFileName = '[GoogleDriveSync] Change Sync File Name',
  SaveForSync = '[GoogleDriveSync] Save For Sync',
  SaveForSyncSuccess = '[GoogleDriveSync] Save For Sync Success',
  CreateSyncFile = '[GoogleDriveSync] Create Sync File',
}

export class LoadFromGoogleDrive implements Action {
  readonly type = GoogleDriveSyncActionTypes.LoadFromGoogleDrive;
}

export class LoadFromGoogleDriveFlow implements Action {
  readonly type = GoogleDriveSyncActionTypes.LoadFromGoogleDriveFlow;
}

export class LoadFromGoogleDriveSuccess implements Action {
  readonly type = GoogleDriveSyncActionTypes.LoadFromGoogleDriveSuccess;

  constructor(public payload: { modifiedDate: any }) {
  }
}

export class SaveToGoogleDriveFlow implements Action {
  readonly type = GoogleDriveSyncActionTypes.SaveToGoogleDriveFlow;
}

export class SaveToGoogleDrive implements Action {
  readonly type = GoogleDriveSyncActionTypes.SaveToGoogleDrive;
}

export class SaveToGoogleDriveSuccess implements Action {
  readonly type = GoogleDriveSyncActionTypes.SaveToGoogleDriveSuccess;

  constructor(public payload: { response: any }) {
  }
}

export class ChangeSyncFileName implements Action {
  readonly type = GoogleDriveSyncActionTypes.ChangeSyncFileName;

  constructor(public payload: { newFileName: string }) {
  }
}

export class SaveForSync implements Action {
  readonly type = GoogleDriveSyncActionTypes.SaveForSync;
}

export class SaveForSyncSuccess implements Action {
  readonly type = GoogleDriveSyncActionTypes.SaveForSyncSuccess;
}

export class CreateSyncFile implements Action {
  readonly type = GoogleDriveSyncActionTypes.CreateSyncFile;

  constructor(public payload: { newFileName: string }) {
  }
}


export type GoogleDriveSyncActions
  = LoadFromGoogleDrive
  | LoadFromGoogleDriveFlow
  | LoadFromGoogleDriveSuccess
  | SaveToGoogleDrive
  | SaveToGoogleDriveFlow
  | SaveToGoogleDriveSuccess
  | ChangeSyncFileName
  | SaveForSync
  | SaveForSyncSuccess
  | CreateSyncFile
  ;
