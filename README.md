# avr_musicbox
令和5年の文化祭で作成した電子オルゴールのソースと開発資料です。






<details><summary>ディレクトリ構造</summary>





-   /Midi2Arduino_original
    -   
    フォーク元のレポジトリ(Midi2Arduino)です。
-   /midi_converter
    -   
    既存のMIDIの音が被っている部分（同時発音の和音ではありません）を自動的に除去するツールのソースコードです。
    -   使用方法 
    
        converte.exeにmidiファイルをドラッグ&ドロップするとedit.midという変換後ファイルがの生成されます。
        同時発音和音は手動で除去しなくてはいけないことに留意してください。
        和音がある場合正常に動作しません

-   /midi
    -   
    -   今回使用したmidiです。
    -   権利的に危ないものは必要な際に別途記載します

-   /arduino/MidiPlayer
    -   
    -   実際の変換に使うソフト（midi2adruno）です。
    元のソースコードから一部改変されており、使うピンやボタンを使った再生/停止システムなどがあるのでソースコードは改変しないことをおすすめします。（あなたがarduinoに関する関する教養がある場合はむしろこのコードを改善してください）

</details>
</br>

# 使用方法
1. まず変換したいmidiを用意します
2. 変換したいmidiを2チャネルのみに絞り、同時発音（発音位置が同じ）和音を消します

    この作業には<a href=https://takabosoft.com/domino>Domino</a>を推奨します

3. converte.exeに編集したmidiをドラッグ&ドロップします
4. (推奨)converte.exeが吐き出したedit.midをリネームします
5. run.batでmidiを変換します。<br>
**dominoで編集した場合、トラック0は適当なピンに割り当ててください！**
