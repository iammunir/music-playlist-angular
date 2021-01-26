export class Song {
    private id: string;
    private title: string;
    private artist: string;
    private duration: number;
    
	constructor($id: string, $title: string, $artist: string, $duration: number) {
        this.id = $id;
		this.title = $title;
		this.artist = $artist;
		this.duration = $duration;
    }

    /**
     * Getter $id
     * @return {string}
     */
	public get $id(): string {
		return this.id;
	}

    /**
     * Setter $id
     * @param {string} value
     */
	public set $id(value: string) {
		this.id = value;
	}
    
    /**
     * Getter $title
     * @return {string}
     */
	public get $title(): string {
		return this.title;
	}

    /**
     * Setter $title
     * @param {string} value
     */
	public set $title(value: string) {
		this.title = value;
	}


    /**
     * Getter $artist
     * @return {string}
     */
	public get $artist(): string {
		return this.artist;
	}

    /**
     * Setter $artist
     * @param {string} value
     */
	public set $artist(value: string) {
		this.artist = value;
	}


    /**
     * Getter $duration
     * @return {number}
     */
	public get $duration(): number {
		return this.duration;
	}

    /**
     * Setter $duration
     * @param {number} value
     */
	public set $duration(value: number) {
		this.duration = value;
	}

}