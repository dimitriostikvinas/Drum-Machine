import React from "react";
import ReactDOM from 'react-dom';

const audioSamples = [
    {
        name: "Heater-1",
        linkTag: "Heater-1",
        keyBoard: "Q"
    },
    {
        name: "Heater-2",
        linkTag: "Heater-2",
        keyBoard: "W"
    },
    {
        name: "Heater-3",
        linkTag: "Heater-3",
        keyBoard: "E"
    },
    {
        name: "Heater-4",
        linkTag: "Heater-4_1",
        keyBoard: "A"
    },
    {
        name: "Clap",
        linkTag: "Heater-6",
        keyBoard: "S"
    },
    {
        name: "Open HH",
        linkTag: "Dsc_Oh",
        keyBoard: "D"
    },
    {
        name: "Kick n' Hat",
        linkTag: "Kick_n_Hat",
        keyBoard: "Z"
    },
    {
        name: "Kick",
        linkTag: "RP4_KICK_1",
        keyBoard: "X"
    },
    {
        name: "Closed HH",
        linkTag: "Cev_H2",
        keyBoard: "C"
    }
];

class AudioSamples extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            audioName: '',
            volume: 0.5,
            currentAudio: null  
        }
        this.playAudio = this.playAudio.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.increaseVolume = this.increaseVolume.bind(this);
        this.decreaseVolume = this.decreaseVolume.bind(this);
    }

    // Method to play audio
    playAudio(name, linkTag) {
        const audioUrl = `https://s3.amazonaws.com/freecodecamp/drums/${linkTag}.mp3`;
        const audio = new Audio(audioUrl);
        audio.volume = this.state.volume; // Set volume based on current state
        audio.play(); // Play the new audio sample
    
        this.setState({ audioName: name });
    }
    

    componentDidMount() {
        // Add event listener for keyboard events
        document.addEventListener('keydown', this.handleKeyPress);
    }

    componentWillUnmount() {
        // Remove event listener when the component unmounts
        document.removeEventListener('keydown', this.handleKeyPress);
    }

    increaseVolume() {
        this.setState(prevState => ({
            volume: Math.min(prevState.volume + 0.1, 1)
        }));
    }

    decreaseVolume() {
        this.setState(prevState => ({
            volume: Math.max(prevState.volume - 0.1, 0)
        }));
    }

    handleKeyPress(event) {
        const keyBoard = event.key.toUpperCase(); // Ensure the key is in uppercase
        const sample = audioSamples.find(sample => sample.keyBoard === keyBoard);
        if (sample) {
            this.playAudio(sample.name, sample.linkTag);
        }
    }

    render(){

        return (
            <div id="drum-machine">
                <div id="display">
                    {audioSamples.map(({ name, linkTag, keyBoard }, index) => (
                        <button className="drum-pad" id={name} onClick={() => this.playAudio(name, linkTag)}>
                            {keyBoard}
                        </button>
                    ))}
                </div>
                <div id="NowPlaying">
                    <span>Now Playing: {this.state.audioName}</span>
                    <div id="VolumeControl">
                        <button onClick={this.decreaseVolume}>-</button>
                        <span>{Math.round(this.state.volume * 100)}%</span>
                        <button onClick={this.increaseVolume}>+</button>
                    </div>
                </div>
            </div>
        );
        
    }
}

ReactDOM.render(<AudioSamples />, document.getElementById('root'));