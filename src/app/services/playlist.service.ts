import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Playlist } from '../models/Playlist';
import { Song } from '../models/Song';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  existingPlaylists: Playlist[] = [
    new Playlist(
      'ply001',
      'Kopikustik', 
      'More than a coffee, this is all of your favorite accoustic songs', 
      2, 
      5,
      [
        new Song('sng01','Cigarettes of ours', 'Ardhito Pramono', 3), 
        new Song('sng02', 'Walking Back Home', 'Vira Talisa', 2)
      ]
    ),
    new Playlist(
      'ply002',
      'Anime Hits',
      'Listen to your favorite Anime songs, all in one playlist.',
      3,
      13,
      [
        new Song('sng03', 'Renai Circulation', 'Kana Hanazawa', 4), 
        new Song('sng04', 'Platinum Disco', 'Tsukihi Phoenix', 4), 
        new Song('sng05', 'Silhouette', 'KANA-BOON', 5)
      ]
    )
  ];

  private playlistUpdateSubject = new Subject<Playlist[]>();
  private actionUpdateSubject = new Subject<{name: string, actionDone: string}>();

  constructor() {}

  getExistingPLaylist(): Playlist[] {
    return [...this.existingPlaylists];
  }

  playlistsListener(): Observable<Playlist[]> {
    return this.playlistUpdateSubject.asObservable();
  }

  addPlaylist(playlist: Playlist): void {
    this.existingPlaylists.push(playlist);
    const playlistName = playlist.$playlistName;
    this.playlistUpdateSubject.next([...this.existingPlaylists]);
    this.actionUpdateSubject.next({name: playlistName, actionDone: 'added'});
  }

  updatePlaylist(playlist: Playlist): void {
    const playlistIndex = this.existingPlaylists.findIndex(existPlaylist => existPlaylist.$playlistId === playlist.$playlistId);
    if (playlistIndex >= 0) {
      this.existingPlaylists[playlistIndex] = playlist;
      const playlistName = playlist.$playlistName;
      this.playlistUpdateSubject.next([...this.existingPlaylists]);
      this.actionUpdateSubject.next({name: playlistName, actionDone: 'updated'});
    }
  }

  deletePlaylist(playlistId: string): void {
    const playlistIndex = this.existingPlaylists.findIndex(playlist => playlist.$playlistId === playlistId);
    if (playlistIndex >= 0) {
      const playlistName = this.existingPlaylists[playlistIndex].$playlistName;
      this.existingPlaylists.splice(playlistIndex, 1);
      this.playlistUpdateSubject.next([...this.existingPlaylists]);
      this.actionUpdateSubject.next({name: playlistName, actionDone: 'deleted'});
    }
  }

  getActionUpdate(): Observable<{name: string, actionDone: string}> {
    return this.actionUpdateSubject.asObservable();
  }
}
