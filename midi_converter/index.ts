import { promises as fs } from 'fs';
import { Midi, Track } from '@tonejs/midi';
import { Tone } from 'tone/build/esm/core/Tone';
import { error } from 'console';
/**
 * 情報表示などに使われるクラス
 */
function deletechords(midi: Midi) {
    let returnmidi = midi;
    interface noteobj {
        ticks: number,
        durationTicks: number
    }
    function remove(obj1: noteobj, obj2: noteobj, debug: boolean) {
        const plus = obj1.ticks + obj1.durationTicks
        if (debug) {
            printtool.printline("removedebug");
            console.log(plus);
            console.log(obj2.ticks);
            printtool.printline("removedebug")
        };
        if (plus > obj2.ticks) {
            const result = obj1.ticks + obj1.durationTicks - obj2.ticks;
            const result2 = obj1.durationTicks;
            const trueresult = result2 - result;
            return trueresult;
        } else { if (debug) { console.log("0を返す。"); } return 0 };
    }
    const resulttracks = returnmidi.tracks.map((track, indexoftrack) => {
        // console.log(index)
        //トラック単位のループ
        let returntrack = track;
        const trackend = track.notes.length;
        const editnote = track.notes.map((note, index, array) => {
            let returnnote = note;
            let backup = JSON.stringify(note)
            //ノート単位のループ
            if (index - 2 > trackend || array[index + 1] === undefined) { console.log(":)"); return note } else {
                // console.log(note);
                // console.log(index + "A?" + trackend);
                const minustick = remove(note, array[index + 1], false);
                if (minustick === 0) return note;
                returnnote.durationTicks = minustick;
                if (returnnote.durationTicks <= 1) {
                    console.log("gateが1になってるぞ" + index);
                    printtool.printline("PUB");
                    console.log(JSON.parse(backup));
                    console.log(array[index + 1]);
                    printtool.printline("PUB");
                    console.log(JSON.parse(backup));
                    console.log(returnnote);
                    console.log(returnnote.durationTicks);
                    printtool.printline("DEBUG");
                    console.log(remove(JSON.parse(backup), array[index + 1], true))
                    printtool.printline("DEBUG")
                    // console.log(indexoftrack);
                    // process.exit();
                }
                return returnnote;
            };
        })
        returntrack.notes = editnote;
        return returntrack;
    });
    returnmidi.tracks = resulttracks;
    return returnmidi;
};
function save(midi: Midi, name: string) {
    fs.writeFile(name, Buffer.from(midi.toArray()))
};
class printtool {
    static printline(input: string) {
        console.log("---------------");
        console.log(input)
        console.log("---------------");
    }
    static printinformation(midi: Midi) {
        console.log('MIDIファイル情報:');
        console.log(`ファイル名: ${midi.name || 'N/A'}`);
        console.log(`トラック数: ${midi.tracks.length}`);
        midi.tracks.forEach((track, index) => {
            console.log(`トラック ${index + 1}:`);
            console.log(`  イベント数: ${track.notes.length}`);
            // console.log(`  拍子記号: ${track.timeSignatures[0]?.timeSignature}`);
        });
    };
};

async function loadMidiFile(midiFilePath: string): Promise<Midi> {
    try {
        // ローカルのMIDIファイルを読み込む
        const midiData = await fs.readFile(midiFilePath);

        // MIDIデータを解析してMIDIインスタンスを返す
        return new Midi(midiData);
    } catch (error) {
        throw new Error(`MIDIファイルの読み込みエラー: ${error}`);
    }
}
function removeEmptyTracks(midi: Midi) {
    let returnmidi = midi;
    const newmidi = midi.tracks.filter((track) => {
        if (track.notes.length !== 0) return track;
    });
    returnmidi.tracks = newmidi;
    return returnmidi;
}


// テスト用例
const midiFilePath = process.argv[2];

loadMidiFile(midiFilePath)
    .then((midi) => {
        // MIDIファイルのインスタンスを使用して何かを行うことができます
        // printtool.printinformation(midi);
        // printtool.printline("空を削除");
        const returnnew = removeEmptyTracks(midi);
        // printtool.printinformation(returnnew);
        // console.log(returnnew.tracks[0].notes[0].durationTicks);
        // fs.writeFile("wtf2.json", JSON.stringify(returnnew.tracks));
        const editmidi = deletechords(returnnew);
        save(editmidi, "edit.mid")
    })
    .catch((error) => {
        console.error(error);
    });
