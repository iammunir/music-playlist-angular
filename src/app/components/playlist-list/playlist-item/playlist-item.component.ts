import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


import { FormPlaylistComponent } from '../../form-playlist/form-playlist.component';
import { Playlist } from 'src/app/models/Playlist';
import { ConfirmationComponent } from '../../confirmation/confirmation.component';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.css']
})
export class PlaylistItemComponent implements OnInit {

  @Input() playlist: Playlist;

  constructor(public dialog: MatDialog, private playlistService: PlaylistService) { }

  ngOnInit(): void {}

  openFormDialog(): void {
    const dialogRef = this.dialog.open(FormPlaylistComponent, {
      width: '65%',
      height : 'auto',
      data: {playlist: this.playlist, formType: 'update'},
      autoFocus: false
    });
  }

  openConfirmationDialog(): void {
    const tobeDeleted = {
      id: this.playlist.$playlistId,
      title: this.playlist.$playlistName,
      confirmed: false
    }
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '45%',
      height : 'auto',
      data: tobeDeleted
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.confirmed) {
        this.playlistService.deletePlaylist(result.id);
      }
    });
  }

}
