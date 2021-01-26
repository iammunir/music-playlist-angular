import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Playlist } from 'src/app/models/Playlist';
import { Song } from 'src/app/models/Song';
import { PlaylistService } from 'src/app/services/playlist.service';


@Component({
  selector: 'app-form-playlist',
  templateUrl: './form-playlist.component.html',
  styleUrls: ['./form-playlist.component.css']
})
export class FormPlaylistComponent implements OnInit {

  playlistForm: FormGroup;
  playlist: Playlist;
  formType: string;

  constructor(
    public dialogRef: MatDialogRef<FormPlaylistComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private playlistService: PlaylistService) {
      this.playlist = data.playlist;
      this.formType = data.formType;
    }

  ngOnInit(): void {
    this.playlistForm = new FormGroup({
      playlistId: new FormControl(this.playlist.$playlistId),
      playlistName: new FormControl(this.playlist.$playlistName, Validators.required),
      description: new FormControl(this.playlist.$description, Validators.required),
      songs: new FormArray(this.mapSonglist()) 
    });
  }

  mapSonglist(): FormGroup[] {
    return this.playlist.$songList.map(song => {
      return new FormGroup({
        id: new FormControl(song.$id),
        title: new FormControl(song.$title, Validators.required),
        artist: new FormControl(song.$artist, Validators.required),
        duration: new FormControl(song.$duration || null, [Validators.required, Validators.min(0)])
     })
    })
  }

  getButtonName(): string {
    return this.formType === 'add' ? 'ADD' : 'UPDATE';
  }

  addSong(): void {
    const newInput = new FormGroup({
      id: new FormControl(null),
      title: new FormControl(null, Validators.required),
      artist: new FormControl(null, Validators.required),
      duration: new FormControl(null, [Validators.required, Validators.min(1)])
    });

    (<FormArray>this.playlistForm.get('songs')).push(newInput);
  }
  
  removeSong(index: number):void {
    (<FormArray>this.playlistForm.get('songs')).removeAt(index);
  }

  onNoClick(): void {
    this.playlistForm.reset();
    this.dialogRef.close();
  }

  onSubmit() {
    const newPlaylist: Playlist = this.constructPlaylist(this.playlistForm.value);
    if (this.formType === 'add') {
      this.playlistService.addPlaylist(newPlaylist);
    } else {
      this.playlistService.updatePlaylist(newPlaylist);
    }
    this.playlistForm.reset();
  }

  constructPlaylist(data: any): Playlist {
    const playlistId: string = data.playlistId || this.createId();
    
    const songs: Song[] = data.songs.map(song => {
      const songId: string = song.id || this.createId();
      return new Song(songId, song.title, song.artist, song.duration);
    })

    const totalDuration: number = songs.reduce((preVal, curSong) => preVal + curSong.$duration, 0);

    return new Playlist(
        playlistId, 
        data.playlistName, 
        data.description,
        songs.length,
        totalDuration, 
        songs
      );
  }

  createId(): string {
    const date: number = Date.now()
    const random: number = Math.floor(Math.random() * 1000);
    return (date + random).toString();
  }

}
