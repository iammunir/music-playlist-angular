import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Playlist } from 'src/app/models/Playlist';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.css']
})
export class PlaylistListComponent implements OnInit, OnDestroy {

  private playlistsSubs: Subscription;
  private actionUpdateSubs: Subscription;
  playlists: Playlist[] = [];

  constructor(private playlistService: PlaylistService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.playlists = this.playlistService.getExistingPLaylist();
    
    this.playlistsSubs = this.playlistService.playlistsListener().subscribe(playlists => {
      this.playlists = playlists;
    });

    this.actionUpdateSubs = this.playlistService.getActionUpdate().subscribe(result => {
      const message = `${result.name} has been successfully ${result.actionDone}`;
      this.openSnackBar(message);
    });
  }

  ngOnDestroy(): void {
    this.playlistsSubs.unsubscribe();
    this.actionUpdateSubs.unsubscribe();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, null, {
      duration: 2000,
      verticalPosition: 'top'
    });
  }

}
