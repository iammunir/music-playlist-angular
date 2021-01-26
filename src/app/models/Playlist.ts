import { Song } from "./Song";

export class Playlist {
    private playlistId: string;
    private playlistName: string;
    private description:string;
    private totalSongs: number;
    private totalDuration: number;
    private songList: Song[];
    
	constructor($playlistId: string, $playlistName: string, $description: string, $totalSongs: number, $totalDuration: number, $songList: Song[]) {
        this.playlistId = $playlistId;
		this.playlistName = $playlistName;
		this.description = $description;
		this.totalSongs = $totalSongs;
		this.totalDuration = $totalDuration;
		this.songList = $songList;
    }    

    /**
     * Getter $playlistId
     * @return {string}
     */
	public get $playlistId(): string {
		return this.playlistId;
	}

    /**
     * Setter $playlistId
     * @param {string} value
     */
	public set $playlistId(value: string) {
		this.playlistId = value;
	}

    /**
     * Getter $playlistName
     * @return {string}
     */
	public get $playlistName(): string {
		return this.playlistName;
	}

    /**
     * Setter $playlistName
     * @param {string} value
     */
	public set $playlistName(value: string) {
		this.playlistName = value;
	}

    /**
     * Getter $description
     * @return {string}
     */
	public get $description(): string {
		return this.description;
	}

    /**
     * Setter $description
     * @param {string} value
     */
	public set $description(value: string) {
		this.description = value;
	}

    /**
     * Getter $totalSongs
     * @return {number}
     */
	public get $totalSongs(): number {
		return this.totalSongs;
	}

    /**
     * Setter $totalSongs
     * @param {number} value
     */
	public set $totalSongs(value: number) {
		this.totalSongs = value;
	}

    /**
     * Getter $totalDuration
     * @return {number}
     */
	public get $totalDuration(): number {
		return this.totalDuration;
	}

    /**
     * Setter $totalDuration
     * @param {number} value
     */
	public set $totalDuration(value: number) {
		this.totalDuration = value;
	}

    /**
     * Getter $songList
     * @return {Song[]}
     */
	public get $songList(): Song[] {
		return this.songList;
	}

    /**
     * Setter $songList
     * @param {Song[]} value
     */
	public set $songList(value: Song[]) {
		this.songList = value;
	}


}