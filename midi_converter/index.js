"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const midi_1 = require("@tonejs/midi");
/**
 * 情報表示などに使われるクラス
 */
function deletechords(midi) {
    let returnmidi = midi;
    function remove(obj1, obj2, debug) {
        const plus = obj1.ticks + obj1.durationTicks;
        if (debug) {
            printtool.printline("removedebug");
            console.log(plus);
            console.log(obj2.ticks);
            printtool.printline("removedebug");
        }
        ;
        if (plus > obj2.ticks) {
            const result = obj1.ticks + obj1.durationTicks - obj2.ticks;
            const result2 = obj1.durationTicks;
            const trueresult = result2 - result;
            return trueresult;
        }
        else {
            if (debug) {
                console.log("0を返す。");
            }
            return 0;
        }
        ;
    }
    const resulttracks = returnmidi.tracks.map((track, indexoftrack) => {
        // console.log(index)
        //トラック単位のループ
        let returntrack = track;
        const trackend = track.notes.length;
        const editnote = track.notes.map((note, index, array) => {
            let returnnote = note;
            let backup = JSON.stringify(note);
            //ノート単位のループ
            if (index - 2 > trackend || array[index + 1] === undefined) {
                console.log(":)");
                return note;
            }
            else {
                // console.log(note);
                // console.log(index + "A?" + trackend);
                const minustick = remove(note, array[index + 1], false);
                if (minustick === 0)
                    return note;
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
                    console.log(remove(JSON.parse(backup), array[index + 1], true));
                    printtool.printline("DEBUG");
                    // console.log(indexoftrack);
                    // process.exit();
                }
                return returnnote;
            }
            ;
        });
        returntrack.notes = editnote;
        return returntrack;
    });
    returnmidi.tracks = resulttracks;
    return returnmidi;
}
;
function save(midi, name) {
    fs_1.promises.writeFile(name, Buffer.from(midi.toArray()));
}
;
class printtool {
    static printline(input) {
        console.log("---------------");
        console.log(input);
        console.log("---------------");
    }
    static printinformation(midi) {
        console.log('MIDIファイル情報:');
        console.log(`ファイル名: ${midi.name || 'N/A'}`);
        console.log(`トラック数: ${midi.tracks.length}`);
        midi.tracks.forEach((track, index) => {
            console.log(`トラック ${index + 1}:`);
            console.log(`  イベント数: ${track.notes.length}`);
            // console.log(`  拍子記号: ${track.timeSignatures[0]?.timeSignature}`);
        });
    }
    ;
}
;
function loadMidiFile(midiFilePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // ローカルのMIDIファイルを読み込む
            const midiData = yield fs_1.promises.readFile(midiFilePath);
            // MIDIデータを解析してMIDIインスタンスを返す
            return new midi_1.Midi(midiData);
        }
        catch (error) {
            throw new Error(`MIDIファイルの読み込みエラー: ${error}`);
        }
    });
}
function removeEmptyTracks(midi) {
    let returnmidi = midi;
    const newmidi = midi.tracks.filter((track) => {
        if (track.notes.length !== 0)
            return track;
    });
    returnmidi.tracks = newmidi;
    return returnmidi;
}
// テスト用例
console.log(process.argv[2]);
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
    save(editmidi, "edit.mid");
})
    .catch((error) => {
    console.error(error);
});
