import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Playlist } from 'src/app/models/Playlist';
import { Song } from 'src/app/models/Song';

import { FormPlaylistComponent } from '../form-playlist/form-playlist.component';

@Component({
  selector: 'app-add-playlist',
  templateUrl: './add-playlist.component.html',
  styleUrls: ['./add-playlist.component.css']
})
export class AddPlaylistComponent implements OnInit {

  playlist: Playlist = new Playlist('', '', '', 0, 0, [new Song('', '', '', 0)]);

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openFormDialog(): void {
    const dialogRef = this.dialog.open(FormPlaylistComponent, {
      width: '65%',
      height : 'auto',
      data: {playlist: this.playlist, formType: 'add'}
    });
  }

}
